pipeline{  
  environment {
    EXPLORER_IMAGE = "bkc-explorer"
    //registry = ""
    //registryCredential = ''
    //dockerImage = ''
  }
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
		
              } 
           }   
        }
    stage('Build Docker image'){
           steps{
              script{
		sh 'docker images'
                echo "$EXPLORER_IMAGE"
                
              }
           }
        }
    stage('Remove Temp Config'){
           steps{
              script{
                sh 'ls'
                echo ">> Removing temporary Dockerfile"
                sh 'rm Dockerfile'
              }
           }
        }
    }
}
