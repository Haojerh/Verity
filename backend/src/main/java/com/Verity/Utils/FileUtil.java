package com.Verity.Utils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.springframework.web.multipart.MultipartFile;

import net.bytebuddy.utility.RandomString;

public class FileUtil {

    public static String saveFile(MultipartFile file, String uploadDir, String prefix) throws IOException {
        if (file == null || file.isEmpty()) return null;

        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs();

        String filename = prefix + "-" + RandomString.make(10) + getExtension(file);
        File target = new File(dir, filename);

        try (FileOutputStream fos = new FileOutputStream(target)) {
            file.getInputStream().transferTo(fos);
        }
        return filename;
    }

    public static void deleteFile(String uploadDir, String filename) {
        if (filename == null || filename.isEmpty()) return;
        
        try {
            String filePath = uploadDir + filename;
            Files.deleteIfExists(Paths.get(filePath));
        } catch (IOException e) {
            System.err.println("Failed to delete file: " + filename + " - " + e.getMessage());
        }
    }

    private static String getExtension(MultipartFile file) {
        String name = file.getOriginalFilename();
        return (name == null || !name.contains(".")) ? "" : name.substring(name.lastIndexOf("."));
    }
}