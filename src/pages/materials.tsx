import RegHeader from "@/components/shared/RegHeader";
import addMaterial from "@/helpers/addMaterial";
import deleteMaterial from "@/helpers/deleteMaterial";
import editMaterial from "@/helpers/editMaterial";
import getCurrentUserInfo from "@/helpers/getCurrentUserInfo";
import getTutorMaterials from "@/helpers/getTutorMaterials";
import IUserProps from "@/interfaces/IUserProps";
import { supabase } from "@/lib/supabase";
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
import { FiEdit3 } from "react-icons/fi";
import { IoImageOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

export default function materials({ userData, materials }: IUserProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [materialId, setMaterialId] = useState("");
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [file, setFile] = useState();

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
          path: "",
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

  return (
    <>
      <RegHeader userData={userData} />
      <Flex mt="32px" direction="column" align="center" gap="16px">
        <Input
          borderColor="#183D3D"
          borderRadius="16px"
          _hover={{ borderColor: "#183D3D" }}
          alignContent="center"
          h="60px"
          w={{ base: "300px", sm: "400px" }}
          type="file"
          onChange={handleFileSelected}
        />
        <Button
          w={{ base: "100px", sm: "200px" }}
          onClick={handleSubmit}
          bgColor="#183D3D"
          color="#eeeeee"
          _hover={{ bgColor: "#93B1A6", color: "#040D12" }}
        >
          Upload
        </Button>
      </Flex>
      <Flex mt="32px" direction="column" align="center">
        {materials?.map((m) => (
          <Flex
            w={{ base: "300px", sm: "400px", md: "600px", lg: "800px" }}
            borderRadius="16px"
            bgColor="#93B1A6"
            justify="space-between"
            m="8px"
            p="16px"
          >
            <Flex align="center" gap="8px">
              <IoImageOutline size="28px" color="#183D3D" />
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

  return {
    props: {
      userData,
      materials,
    },
  };
};
