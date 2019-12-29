package com.example.bts_smartreferee.services;

import com.example.bts_smartreferee.services.interfaces.AnalysisServiceInterface;
import org.apache.thrift.TException;
import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.protocol.TProtocol;
import org.apache.thrift.transport.TSocket;
import org.apache.thrift.transport.TTransport;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AnalysisService {
    @Value("localhost")
    private String thriftServer;

    @Value("5555")
    private String thriftPort;

    public int execute(String path){
        Integer port = Integer.parseInt(this.thriftPort);
        TTransport tTransport = new TSocket(thriftServer, port);

        try{
            tTransport.open();
            TProtocol tProtocol = new TBinaryProtocol(tTransport);
            AnalysisServiceInterface.Client client = new AnalysisServiceInterface.Client(tProtocol);

            int serverResponse = client.result(path);

            tTransport.close();
            return serverResponse;
        }
        catch (TException e) {
            e.printStackTrace();
        }

        return -1;
    }
}
