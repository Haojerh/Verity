package com.Verity.Utils;

import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import net.bytebuddy.utility.RandomString;

public class FileUtil {

    public static String saveFile(MultipartFile file, String uploadDir, String prefix) throws IOException {
        if (file == null || file.isEmpty()) return null;

        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs();

        String filename = prefix + "-" + RandomString.make(10) + getExtension(file);
        File target = new File(dir, filename);

        file.getInputStream().transferTo(new FileOutputStream(target));
        return filename;
    }

    public static void deleteFile(String uploadDir, String filename) {
        if (filename == null || filename.isEmpty()) return;
        File file = new File(uploadDir + filename);
        if (file.exists()) file.delete();
    }

    private static String getExtension(MultipartFile file) {
        String name = file.getOriginalFilename();
        return (name == null || !name.contains(".")) ? "" : name.substring(name.lastIndexOf("."));
    }
}