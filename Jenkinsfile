node {
     def app 
     stage('clone repository') {
      checkout scm  
    }
     stage('Build docker Image'){
      app = docker.build("sarmadrauf/dockerdemo")
    }
     stage('Test Image'){
       app.inside {
         sh 'echo "TEST PASSED"' 
      }  
    }
     stage('Push Image'){
       docker.withRegistry([ credentialsId: "sarmadrauf", url: "https://hub.docker.com/repository/docker/sarmadrauf/dockerdemo" ]) {            
       app.push("${env.BUILD_NUMBER}")            
       app.push("latest")   
   }
}
     
}
