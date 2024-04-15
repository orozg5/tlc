import RegHeader from "@/components/shared/RegHeader";
import addFolder from "@/helpers/addFolder";
import addMaterial from "@/helpers/addMaterial";
import deleteMaterial from "@/helpers/deleteMaterial";
import editMaterial from "@/helpers/editMaterial";
import getCurrentUserInfo from "@/helpers/getCurrentUserInfo";
import getTutorFolders from "@/helpers/getTutorFolders";
import getTutorMaterials from "@/helpers/getTutorMaterials";
import IUserProps from "@/interfaces/IUserProps";
import { supabase } from "@/lib/supabase";
import { getExtension } from "@/utils/getExtension";
import { getMe } from "@/utils/getMe";
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { BsFiletypeDocx } from "react-icons/bs";
import {
  FaFileAlt,
  FaFileArchive,
  FaFileImage,
  FaFilePowerpoint,
  FaRegFile,
  FaRegFileExcel,
  FaRegFilePdf,
  FaRegFolderOpen,
} from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { IoImageOutline, IoReturnUpBack } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

export default function materials({ userData, materials, folders }: IUserProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isCFOpen, onOpen: onCFOpen, onClose: onCFClose } = useDisclosure();
  const [materialId, setMaterialId] = useState("");
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [file, setFile] = useState();
  const [folderName, setFolderName] = useState("");
  const [path, setPath] = useState("/");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (file) {
      const filename = `${uuidv4()}-${file.name}`;

      const { data, error } = await supabase.storage.from("files").upload(filename, file, {
        cacheControl: "3600",
        upsert: false,
      });

      const filepath = data?.path;
      if (filepath && userData?.id) {
        const res = await addMaterial({
          instructor_id: userData?.id,
          is_public: false,
          file_url: filepath,
          file_name: file.name,
          path: path,
        });
        if (res.status === 200) {
          setFile(undefined);
          window.location.reload();
        }
      }
    }
  };

  const downloadFile = async (filename: string, filepath: string) => {
    const { data, error } = await supabase.storage.from("files").download(filepath);
    if (data) {
      const blob = new Blob([data]);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      link.click();

      window.URL.revokeObjectURL(url);
    }
  };

  const deleteFile = async (filepath: string, id: string) => {
    const { data, error } = await supabase.storage.from("files").remove([filepath]);
    if (data) {
      if (filepath && id) {
        const res = await deleteMaterial(id);
        if (res.status === 200) {
          window.location.reload();
        }
      }
    }
  };

  const handleEdit = async () => {
    if (name && newName && materialId) {
      const parts = name.split(".");
      const extension = parts[parts.length - 1];
      const res = await editMaterial(materialId, newName + "." + extension);
      if (res.status === 200) {
        window.location.reload();
      }
    }
  };

  const handleFileSelected = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleNewFolder = async () => {
    if (path && userData?.id && folderName) {
      const res = await addFolder({
        instructor_id: userData?.id,
        folder_name: folderName,
        folder_path: path,
      });
      if (res.status === 200) {
        window.location.reload();
      }
    }
  };

  const goBack = () => {
    const currentPath = path.substring(0, path.length-1);
    const lastIndex = currentPath.lastIndexOf("/");
    const res = currentPath.substring(0, lastIndex);
    setPath(res + "/");
    
  };

  return (
    <>
      <RegHeader userData={userData} />
      <Flex mt="32px" direction="column" align="center" gap="16px">
        <Flex w={{ base: "300px", sm: "400px" }} align="center" gap="8px">
          <Input
            borderColor="#183D3D"
            borderRadius="16px"
            _hover={{ borderColor: "#183D3D" }}
            alignContent="center"
            h="60px"
            type="file"
            onChange={handleFileSelected}
          />
          <Button
            onClick={handleSubmit}
            bgColor="#183D3D"
            color="#eeeeee"
            _hover={{ bgColor: "#93B1A6", color: "#040D12" }}
          >
            Upload
          </Button>
        </Flex>
        <Button
          onClick={onCFOpen}
          w="200px"
          bgColor="#183D3D"
          color="#eeeeee"
          _hover={{ bgColor: "#93B1A6", color: "#040D12" }}
        >
          Create new folder
        </Button>
        {path !== "/" && (
          <Flex align="center">
            <IoReturnUpBack size="28px" color="#eeeeee" onClick={goBack} />
            <Text ml="8px">{"home" + path.split("/").join(" -> ").slice(0, -4)}</Text>
          </Flex>
        )}
      </Flex>
      <Flex mt="32px" direction="column" align="center">
        {folders
          ?.filter((f) => f.folder_path === path)
          .map((f) => (
            <Flex
              w={{ base: "300px", sm: "400px", md: "600px", lg: "800px" }}
              borderRadius="16px"
              bgColor="#93B1A6"
              justify="space-between"
              m="8px"
              p="16px"
            >
              <Flex align="center" gap="8px">
                <FaRegFolderOpen size="28px" color="#183D3D" />
                <Text
                  w={{ base: "100px", sm: "200px", md: "400px", lg: "600px" }}
                  onClick={() => setPath(path + f.folder_name + "/")}
                  _hover={{ cursor: "pointer", color: "#040D12" }}
                  color="#183D3D"
                >
                  {f.folder_name}
                </Text>
              </Flex>
            </Flex>
          ))}
      </Flex>

      <Flex mt="32px" direction="column" align="center">
        {materials
          ?.filter((m) => m.path === path)
          .map((m) => (
            <Flex
              w={{ base: "300px", sm: "400px", md: "600px", lg: "800px" }}
              borderRadius="16px"
              bgColor="#93B1A6"
              justify="space-between"
              m="8px"
              p="16px"
            >
              <Flex align="center" gap="8px">
                {getExtension(m.file_name) == "pdf" ? (
                  <FaRegFilePdf size="28px" color="#183D3D" />
                ) : getExtension(m.file_name) == "docx" ? (
                  <BsFiletypeDocx size="28px" color="#183D3D" />
                ) : getExtension(m.file_name) == "xlsx" ? (
                  <FaRegFileExcel size="28px" color="#183D3D" />
                ) : getExtension(m.file_name) == "png" ||
                  getExtension(m.file_name) == "jpg" ||
                  getExtension(m.file_name) == "jpeg" ? (
                  <FaFileImage size="28px" color="#183D3D" />
                ) : getExtension(m.file_name) == "zip" ? (
                  <FaFileArchive size="28px" color="#183D3D" />
                ) : getExtension(m.file_name) == "pptx" ? (
                  <FaFilePowerpoint size="28px" color="#183D3D" />
                ) : getExtension(m.file_name) == "txt" ? (
                  <FaFileAlt size="28px" color="#183D3D" />
                ) : (
                  <FaRegFile size="28px" color="#183D3D" />
                )}
                <Text
                  w={{ base: "100px", sm: "200px", md: "400px", lg: "600px" }}
                  onClick={() => downloadFile(m.file_name, m.file_url)}
                  _hover={{ cursor: "pointer", color: "#040D12" }}
                  color="#183D3D"
                >
                  {m.file_name}
                </Text>
              </Flex>
              <Flex color="#183D3D" align="center" gap="8px">
                <Text _hover={{ cursor: "pointer", color: "#040D12" }}>
                  <FiEdit3
                    size="22px"
                    onClick={() => {
                      setMaterialId(m.material_id || "");
                      setName(m.file_name);
                      onOpen();
                    }}
                  />
                </Text>
                <Text _hover={{ cursor: "pointer", color: "#040D12" }}>
                  <MdDeleteOutline onClick={() => deleteFile(m.file_url, m.material_id || "")} size="22px" />
                </Text>
              </Flex>
            </Flex>
          ))}
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent color="#040D12" bg="#93B1A6">
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <ModalHeader>Change file name</ModalHeader>
            <Text mt="8px">Change from {name} to:</Text>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              w="264px"
              borderColor="#040D12"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#040D12"
            />
            <Flex mb="16px" mt="16px" gap="8px" justify="center">
              <Button
                onClick={() => {
                  onClose();
                }}
                bgColor="#183D3D"
                color="#eeeeee"
                _hover={{ bgColor: "#5C8374", color: "#040D12" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleEdit}
                color="#040D12"
                bgColor="#F1C93B"
                _hover={{ bgColor: "#FAE392", color: "gray.500" }}
              >
                Submit
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isCFOpen} onClose={onCFClose}>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent color="#040D12" bg="#93B1A6">
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <ModalHeader>Create folder</ModalHeader>
            <Text mt="8px">Set folder name to:</Text>
            <Input
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              w="264px"
              borderColor="#040D12"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#040D12"
            />
            <Flex mb="16px" mt="16px" gap="8px" justify="center">
              <Button
                onClick={() => {
                  onCFClose();
                }}
                bgColor="#183D3D"
                color="#eeeeee"
                _hover={{ bgColor: "#5C8374", color: "#040D12" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleNewFolder}
                color="#040D12"
                bgColor="#F1C93B"
                _hover={{ bgColor: "#FAE392", color: "gray.500" }}
              >
                Submit
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<IUserProps> = async ({ req }) => {
  let session = await getMe(req);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  let userData = await getCurrentUserInfo(req);
  let materials = await getTutorMaterials(req);
  let folders = await getTutorFolders(req);

  return {
    props: {
      userData,
      materials,
      folders,
    },
  };
};
