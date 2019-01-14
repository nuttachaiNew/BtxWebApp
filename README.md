
# Tech

1. `Java 8 (JDK 1.8)`,Spring 4 ,Tomcat 8.5 base only
2. Spring Security Support(iMemory,ldap,webservice)
3. Support Serve Static Resources 
4. Support Resource Versioning(css,js)

### Required Software
| Software | Link |
| ------ | ------ |
| JDK 1.8 | http://www.oracle.com/technetwork/java/javase/downloads/index.html |
| Maven 3.3  |https://maven.apache.org/download.cgi |
| Docker |https://www.docker.com|

# Configuration file
You can change configuraetion at file `./src/main/resources/server.properties`

# Running
```sh
$ curl -H "Content-type: application/json" -H "Accept: application/json" http://localhost:8888

* Then run
```sh
$ mvn clean compile -Dmaven.test.skip=true -Djetty.port=8080 -Dcatalina.base=/tmp -DrootPath=/tmp jetty:run
```
  - `/tmp` is folder that log will be place
  - `-Djetty.port=8080` you can change to any port like  `-Djetty.port=9999`


** **

###########
before package 
change port engine in 
server.properties to
EngineServer=http://localhost:8080/

mvn clean compile package -Dmaven.test.skip=true 

