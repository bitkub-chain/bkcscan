def remote = [:]
remote.name = "bkc-explorer"
remote.host = "47.241.216.76"
remote.allowAnyHosts = true
EXPLORER_IMAGE = "bkc-explorer"

pipeline {
  //environment {
    //EXPLORER_IMAGE = "bkc-explorer"
    //registry = ""
    //registryCredential = ''
    //dockerImage = ''
  //}
  agent any
  stages {
        stage('Create Temp Config') {
              steps {
	      withCredentials([sshUserPrivateKey(credentialsId: 'internal_explorer_test', keyFileVariable: 'identity', passphraseVariable: 'passPhrase', usernameVariable: 'userName')]) {
                remote.user = userName
                remote.identityFile = identity
                remote.passphrase = passPhrase
		}
                    sshCommand remote: remote, command: 'ls'
                    sshCommand remote: remote, command: 'pwd'
                    sshCommand remote: remote, command: 'echo ">> Making temporary file"'
                    //sshCommand remote: remote, command: 'cp docker/Dockerfile ./'
                    //sshCommand remote: remote, command: 'cp docker/stop.'
                //sh 'ls'
                //echo ">> Making temporary Dockerfile"
                //sh 'cp docker/Dockerfile Dockerfile'
                }
	      }
        stage('Build Docker image'){
	      steps {
                    sshCommand remote: remote, command: 'echo ">> Building Docker image"'
                //sh 'docker images'
                //echo "$EXPLORER_IMAGE"

                }
	      }
        stage('Remove Temp Config'){
	      steps{
                    sshCommand remote: remote, command: 'echo ">> Removing temporary files"'
                //sh 'ls'
                //echo ">> Removing temporary Dockerfile"
                //sh 'rm Dockerfile'

                }
            }
        }
}
