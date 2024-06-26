import RegHeader from "@/components/shared/RegHeader";
import addFolder from "@/helpers/addFolder";
import addMaterial from "@/helpers/addMaterial";
import deleteMaterial from "@/helpers/deleteMaterial";
import editMaterial from "@/helpers/editMaterial";
import IUserProps from "@/interfaces/IUserProps";
import { supabase } from "@/lib/supabase";
import { getExtension } from "@/utils/getExtension";
import {
  Box,
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
import { useState } from "react";
import { BsFiletypeDocx } from "react-icons/bs";
import {
  FaEye,
  FaEyeSlash,
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
import { IoReturnUpBack } from "react-icons/io5";
import { RiUserSharedLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import materialShare from "@/helpers/materialShare";
import editShareMaterial from "@/helpers/editShareMaterial";
import editFolder from "@/helpers/editFolder";
import deleteFolder from "@/helpers/deleteFolder";
import deleteShareMaterial from "@/helpers/deleteShareMaterial";
import makeMaterialPublic from "@/helpers/makeMaterialPublic";
import makeMaterialPrivate from "@/helpers/makeMaterialPrivate";

export default function TutorMaterials({ userData, materials, folders, users, materials_students }: IUserProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isFolderEditOpen, onOpen: onFolderEditOpen, onClose: onFolderEditClose } = useDisclosure();
  const { isOpen: isCFOpen, onOpen: onCFOpen, onClose: onCFClose } = useDisclosure();
  const { isOpen: isShareOpen, onOpen: onShareOpen, onClose: onShareClose } = useDisclosure();
  const { isOpen: isEditShareOpen, onOpen: onEditShareOpen, onClose: onEditShareClose } = useDisclosure();
  const { isOpen: isDeleteFolderOpen, onOpen: onDeleteFolderOpen, onClose: onDeleteFolderClose } = useDisclosure();

  const [file, setFile] = useState();
  const [materialId, setMaterialId] = useState("");
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [fileError, setFileError] = useState(false);
  const [fileNameError, setFileNameError] = useState(false);

  const [folderName, setFolderName] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const [folderId, setFolderId] = useState("");
  const [path, setPath] = useState("/");
  const [folderError, setFolderError] = useState(false);

  const [shareMaterial, setShareMaterial] = useState(() => {
    return users?.map((u) => ({
      id: u.id,
      date: "",
    }));
  });
  const [editShare, setEditShare] = useState({
    student_id: "",
    student_name: "",
    old_date: "",
    date: "",
    id: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (file) {
      setFileError(false);
      if (file.name && path) {
        let fileExists = false;
        materials?.forEach((m) => {
          if (m.file_name === file.name && m.path === path) {
            fileExists = true;
            setFileError(true);
            return;
          }
        });

        if (fileExists) {
          return;
        }
      }

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
        try {
          const res = await deleteMaterial(id);
          if (res.status === 200) {
            window.location.reload();
          }
        } catch (error) {}
      }
    }
  };

  const handleEdit = async () => {
    if (name && newName && materialId) {
      const parts = name.split(".");
      const extension = parts[parts.length - 1];

      setFileNameError(false);
      let fileExists = false;
      materials?.forEach((m) => {
        if (m.file_name === newName + "." + extension && m.path === path) {
          fileExists = true;
          setFileNameError(true);
          return;
        }
      });

      if (fileExists) {
        return;
      }
      try {
        const res = await editMaterial(materialId, newName + "." + extension);
        if (res.status === 200) {
          window.location.reload();
        }
      } catch (error) {}
    }
  };

  const handleFolderEdit = async () => {
    setFolderError(false);
    if (folderName && newFolderName && folderId && path) {
      let folderExists = false;
      folders?.forEach((folder) => {
        if (folder.folder_name === newFolderName && folder.folder_path === path) {
          folderExists = true;
          setFolderError(true);
          return;
        }
      });

      if (folderExists) {
        return;
      }

      try {
        const res = await editFolder(folderId, newFolderName, path, folderName);
        if (res.status === 200) {
          window.location.reload();
        }
      } catch (error) {}
    }
  };

  const handleFileSelected = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleNewFolder = async () => {
    setFolderError(false);
    if (path && userData?.id && folderName) {
      let folderExists = false;
      folders?.forEach((folder) => {
        if (folder.folder_name === folderName && folder.folder_path === path) {
          folderExists = true;
          setFolderError(true);
          return;
        }
      });

      if (folderExists) {
        return;
      }

      try {
        const res = await addFolder({
          instructor_id: userData?.id,
          folder_name: folderName,
          folder_path: path,
        });

        if (res.status === 200) {
          window.location.reload();
        }
      } catch (error) {}
    }
  };

  const goBack = () => {
    const currentPath = path.substring(0, path.length - 1);
    const lastIndex = currentPath.lastIndexOf("/");
    const res = currentPath.substring(0, lastIndex);
    setPath(res + "/");
  };

  const handleShareSubmit = async () => {
    if (materialId && shareMaterial) {
      try {
        const res = await materialShare(materialId, shareMaterial);
        if (res.status === 200) {
          window.location.reload();
        }
      } catch (error) {}
    }
  };

  const handleEditShare = async () => {
    if (editShare.id && editShare.date) {
      try {
        const res = await editShareMaterial(editShare.id, editShare.date);
        if (res.status === 200) {
          window.location.reload();
        }
      } catch (error) {}
    }
  };

  const handleDeleteFolder = async () => {
    if (folderName && path && folderId) {
      let sendPath = path.split("/").join("***");
      try {
        const res = await deleteFolder(folderName, sendPath, folderId);
        if (res.status === 200) {
          window.location.reload();
        }
      } catch (error) {}
    }
  };

  const deleteSharing = async () => {
    if (editShare.id) {
      try {
        const res = await deleteShareMaterial(editShare.id);
        if (res.status === 200) {
          window.location.reload();
        }
      } catch (error) {}
    }
  };

  const makePublic = async (id: string) => {
    if (id) {
      try {
        const res = await makeMaterialPublic(id);
        if (res.status === 200) {
          window.location.reload();
        }
      } catch (error) {}
    }
  };
  const makePrivate = async (id: string) => {
    if (id) {
      try {
        const res = await makeMaterialPrivate(id);
        if (res.status === 200) {
          window.location.reload();
        }
      } catch (error) {}
    }
  };

  return (
    <>
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
        {fileError && <Text color="#8A1414">This file name already exists.</Text>}
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
          <Flex mt="16px" align="center">
            <Text onClick={goBack} _hover={{ cursor: "pointer" }}>
              <IoReturnUpBack size="28px" color="#eeeeee" />
            </Text>
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
              <Flex color="#183D3D" align="center" gap="8px">
                <Text _hover={{ cursor: "pointer", color: "#040D12" }}>
                  <FiEdit3
                    onClick={() => {
                      setFolderName(f.folder_name);
                      setFolderId(f.folder_id || "");
                      onFolderEditOpen();
                    }}
                    size="22px"
                  />
                </Text>
                <Text _hover={{ cursor: "pointer", color: "#040D12" }}>
                  <MdDeleteOutline
                    onClick={() => {
                      setFolderName(f.folder_name);
                      setFolderId(f.folder_id || "");
                      onDeleteFolderOpen();
                    }}
                    size="22px"
                  />
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
                  {!m.is_public && (
                    <FaEyeSlash
                      onClick={() => {
                        makePublic(m.material_id || "");
                      }}
                      size="22px"
                    />
                  )}
                  {m.is_public && (
                    <FaEye
                      onClick={() => {
                        makePrivate(m.material_id || "");
                      }}
                      size="22px"
                    />
                  )}
                </Text>
                <Text _hover={{ cursor: "pointer", color: "#040D12" }}>
                  <RiUserSharedLine
                    onClick={() => {
                      setMaterialId(m.material_id || "");
                      setName(m.file_name);
                      onShareOpen();
                    }}
                    size="22px"
                  />
                </Text>
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
            {fileNameError && (
              <Text mt="16px" color="#8A1414">
                This file name already exists.
              </Text>
            )}
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

      <Modal isOpen={isFolderEditOpen} onClose={onFolderEditClose}>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent color="#040D12" bg="#93B1A6">
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <ModalHeader>Change folder name</ModalHeader>
            <Text mt="8px">Change from {folderName} to:</Text>
            <Input
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              w="264px"
              borderColor="#040D12"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#040D12"
            />
            {folderError && (
              <Text mt="16px" color="#8A1414">
                This folder name already exists.
              </Text>
            )}
            <Flex mb="16px" mt="16px" gap="8px" justify="center">
              <Button
                onClick={() => {
                  onFolderEditClose();
                }}
                bgColor="#183D3D"
                color="#eeeeee"
                _hover={{ bgColor: "#5C8374", color: "#040D12" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleFolderEdit}
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
            {folderError && (
              <Text mt="16px" color="#8A1414">
                This folder name already exists.
              </Text>
            )}
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

      <Modal isOpen={isShareOpen} onClose={onShareClose}>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent color="#040D12" bg="#93B1A6">
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <ModalHeader>Share {name}</ModalHeader>
            <Flex mr="32px" ml="32px" mt="8px" justify="space-between">
              <Text>Share with:</Text>
              <Text>Until:</Text>
            </Flex>
            <Box>
              {users?.map((s) => {
                const material_student = materials_students?.find(
                  (entry) => entry.student_id === s.id && entry.material_id === materialId
                );

                if (material_student) {
                  return (
                    <Flex key={s.id} mr="32px" ml="32px" mt="8px" justify="space-between" align="center">
                      <Text>{s.name}</Text>
                      <Text
                        _hover={{ cursor: "pointer", color: "#183D3D" }}
                        onClick={() => {
                          setEditShare({
                            student_id: s.id,
                            student_name: s.name || "",
                            old_date: material_student.expiry_date.split("T")[0],
                            date: "",
                            id: material_student.id,
                          });
                          onEditShareOpen();
                        }}
                      >
                        {material_student.expiry_date.split("T")[0]}
                      </Text>
                    </Flex>
                  );
                }
                return (
                  <Flex key={s.id} mr="32px" ml="32px" mt="8px" justify="space-between" align="center">
                    <Text>{s.name}</Text>
                    <Input
                      w="180px"
                      type="date"
                      borderColor="#040D12"
                      _hover={{ borderColor: "#5C8374" }}
                      focusBorderColor="#040D12"
                      onChange={(e) =>
                        setShareMaterial((prev) =>
                          prev?.map((u) => (u.id === s.id ? { ...u, date: e.target.value } : u))
                        )
                      }
                    />
                  </Flex>
                );
              })}
            </Box>
            <Flex mb="16px" mt="16px" gap="8px" justify="center">
              <Button
                onClick={() => {
                  onShareClose();
                }}
                bgColor="#183D3D"
                color="#eeeeee"
                _hover={{ bgColor: "#5C8374", color: "#040D12" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleShareSubmit}
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

      <Modal isOpen={isEditShareOpen} onClose={onEditShareClose}>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent color="#040D12" bg="#93B1A6">
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <ModalHeader>
              Edit expiry date of {name} for {editShare.student_name}
            </ModalHeader>
            <Button
              mt="8px"
              onClick={deleteSharing}
              bgColor="#183D3D"
              color="#eeeeee"
              _hover={{ bgColor: "#5C8374", color: "#040D12" }}
            >
              Stop sharing
            </Button>
            <Text>or</Text>
            <Text>Change date from {editShare.old_date} to:</Text>
            <Input
              type="date"
              onChange={(e) => setEditShare({ ...editShare, date: e.target.value })}
              borderColor="#040D12"
              _hover={{ borderColor: "#5C8374" }}
              focusBorderColor="#040D12"
            />
            <Flex mb="16px" mt="16px" gap="8px" justify="center">
              <Button
                onClick={() => {
                  onEditShareClose();
                }}
                bgColor="#183D3D"
                color="#eeeeee"
                _hover={{ bgColor: "#5C8374", color: "#040D12" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleEditShare}
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

      <Modal isOpen={isDeleteFolderOpen} onClose={onDeleteFolderClose}>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent color="#040D12" bg="#93B1A6">
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <Text mt="8px">Are you sure you want to delete {folderName} and all of it's contents?</Text>
            <Flex mb="16px" mt="16px" gap="8px" justify="center">
              <Button
                onClick={() => {
                  onDeleteFolderClose();
                }}
                bgColor="#183D3D"
                color="#eeeeee"
                _hover={{ bgColor: "#5C8374", color: "#040D12" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteFolder}
                color="#040D12"
                bgColor="#F1C93B"
                _hover={{ bgColor: "#FAE392", color: "gray.500" }}
              >
                Yes
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
