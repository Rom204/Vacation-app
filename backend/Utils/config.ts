// Configuration

class Config { 
    public port = 3000; 
    // mysql database
    public mySQLhost = "localhost";
    public mySQLUser = "root";
    public mySQLPassword = "12345678";
    // schema name   vvvvvvvvvvvv
    public mySQLdb = "something";
    
    //another database
}

const config = new Config();
export default config