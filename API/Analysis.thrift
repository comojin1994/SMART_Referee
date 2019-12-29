namespace java com.example.bts_smartreferee.thrift
//namespace py python_thrift

typedef i32 int

service AnalysisService{
    int result(1: string path),
}