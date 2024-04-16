import IUserProps from "@/interfaces/IUserProps";
import { supabase } from "@/lib/supabase";
import { getExtension } from "@/utils/getExtension";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { BsFiletypeDocx } from "react-icons/bs";
import {
  FaFileAlt,
  FaFileArchive,
  FaFileImage,
  FaFilePowerpoint,
  FaRegFile,
  FaRegFileExcel,
  FaRegFilePdf,
} from "react-icons/fa";

export default function StudentMaterials({ currentStudentMaterials }: IUserProps) {
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
  return (
    <Flex mt="32px" direction="column" align="center">
      {currentStudentMaterials?.map((m) => (
        <Flex
          w={{ base: "300px", sm: "400px", md: "600px", lg: "800px" }}
          borderRadius="16px"
          bgColor="#93B1A6"
          justify="space-between"
          m="8px"
          p="16px"
          align="center"
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
          <Text color="#183D3D">{m.expiry_date.split("T")[0]}</Text>
        </Flex>
      ))}
    </Flex>
  );
}
