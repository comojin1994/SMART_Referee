package com.example.bts_smartreferee.controllers;

import com.example.bts_smartreferee.services.AnalysisService;
import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.*;

@RestController
@RequestMapping("analysis")
public class AnalysisController {
    @Autowired
    AnalysisService analysisService;

    @PostMapping("/result")
    public ResponseEntity<Integer> getResult(HttpServletRequest request) {
        String src = "/home/ubuntu/test/server_assets/git_work/Data/test/";

        System.out.println("#####################################");
        System.out.println("#                                   #");
        System.out.println("#       SMART_Referee Judgement     #");
        System.out.println("#                                   #");
        System.out.println("#                                   #");
        System.out.println("#              Upload...            #");
        System.out.println("#####################################");

        int result = 42;

        try {
            boolean isMultipart = ServletFileUpload.isMultipartContent(request);
            if (!isMultipart) return new ResponseEntity<>(-2, HttpStatus.EXPECTATION_FAILED);

            ServletFileUpload upload = new ServletFileUpload();
            FileItemIterator iter = upload.getItemIterator(request);

            while (iter.hasNext()) {
                FileItemStream item = iter.next();
                InputStream in = item.openStream();

                if (!item.isFormField()) {
                    String filename = item.getName();

                    File imgPath = new File(src + filename);          // change name
                    FileUtils.copyInputStreamToFile(in, imgPath);               // Targeting image to path

                    System.out.println("image target path: " + imgPath.getCanonicalPath());
                    result = analysisService.execute(imgPath.getCanonicalPath());

                    in.close();
               }
            }
        } catch (FileUploadException e) {
            return new ResponseEntity<>(42, HttpStatus.EXPECTATION_FAILED);
        } catch (IOException e) {
            return new ResponseEntity<>(42, HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE);
        }

        System.out.println("result: " + result);
        return new ResponseEntity<>(result, result == -1 ? HttpStatus.EXPECTATION_FAILED: HttpStatus.OK);
    }
}
