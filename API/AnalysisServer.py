#!/usr/bin/env python

import sys
import os
import tensorflow as tf

sys.path.append('gen-py')

from Analysis import AnalysisService

from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
from thrift.server import TServer
from SMART_Referee_server import model

class ReportServiceHandler(AnalysisService.Iface):
    def result(self, path):
        global sess
        res = model(path, sess)
        return res


def start_server():
    handler = ReportServiceHandler()
    processor = AnalysisService.Processor(handler)
    transport = TSocket.TServerSocket(port=5555)
    tfactory = TTransport.TBufferedTransportFactory()
    pfactory = TBinaryProtocol.TBinaryProtocolFactory()

    server = TServer.TSimpleServer(processor, transport, tfactory, pfactory)

    print('Starting the server...')
    server.serve()
    print('done.')

if __name__ == "__main__":
    global sess
    sess = tf.Session()
    start_server()
    sess.close()