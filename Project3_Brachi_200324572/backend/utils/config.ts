class Config {
    public port = 3000;
    public mysqlHost = "localhost";
    public mysqlUser = "root";
    public mysqlPassword = "12345678";
    public mysqlDatabase = "project3";
  }
  
  const config = new Config();
  export default config;