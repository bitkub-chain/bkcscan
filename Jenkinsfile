pipeline{  
  environment {
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
		sh 'echo "Hola"'
		sh 'echo "Hola" > /tmp/test.txt'
              } 
           }   
        }
    }
}
