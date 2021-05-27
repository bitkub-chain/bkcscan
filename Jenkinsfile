pipeline{  
//  environment {
    //registry = ""
    //registryCredential = ''
    //dockerImage = ''
//  }
  agent any
    stages {
        stage('Create Temp Config'){
           steps{
              script{
//		withCredentials([file(credentialsId: 'ghsecret', variable: '')]) {
//		} 
		sh 'ls'
		echo ">> Making temporary Dockerfile"
		sh 'cp docker/Dockerfile Dockerfile'
		echo ">> Removing temporary Dockerfile"
		sh 'rm Dockerfile'
              } 
           }   
        }
    }
}
