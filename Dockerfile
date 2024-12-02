# Step 1: Build the application using Maven
FROM maven:3.5.2-jdk-8-alpine AS MAVEN_TOOL_CHAIN

COPY pom.xml /tmp/
COPY src /tmp/src/

WORKDIR /tmp/
RUN mvn clean package

# Step 2: Prepare the Tomcat server
FROM tomcat:9.0-jre8-alpine AS TOMCAT_SERVER

# Step 3: Create necessary directories with correct permissions
RUN mkdir -p /usr/local/tomcat/conf/Catalina/localhost && \
	mkdir -p /usr/local/tomcat/webapps/edata && \
    chmod -R 755 /usr/local/tomcat/conf /usr/local/tomcat/webapps

# Step 4: Copy the application package and folder from the Maven build to the Tomcat webapps directory
COPY --from=MAVEN_TOOL_CHAIN /tmp/target/edata-1.0.war $TOMCAT_SERVER/usr/local/tomcat/webapps/edata.war
COPY --from=MAVEN_TOOL_CHAIN /tmp/target/edata-1.0 $TOMCAT_SERVER/usr/local/tomcat/webapps/edata/

# Step 5: Expose the default Tomcat port
EXPOSE 8080

# Step 6: Command to start Tomcat
CMD ["catalina.sh", "run"]
