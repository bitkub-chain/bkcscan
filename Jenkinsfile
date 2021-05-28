def remote = [:]
remote.name = "bkc-explorer"
remote.host = "47.241.216.76"
remote.allowAnyHosts = true
EXPLORER_IMAGE = "bkc-explorer"
//GIT_REPO = 
//GIT_NAME = 

node {
    withCredentials([sshUserPrivateKey(credentialsId: 'internal_explorer_test', keyFileVariable: 'identity', passphraseVariable: 'passPhrase', usernameVariable: 'userName')]) {
        remote.user = userName
        remote.identityFile = identity
        remote.passphrase = passPhrase
	stage('Clone git repository'){
	    sshCommand remote: remote, command: 'if [ -d "jenkins" ]; then cd jenkins; else mkdir jenkins; cd jenkins; fi'
	    sshCommand remote: remote, command: 'ls'
	    sshCommand remote: remote, command: 'cd jenkins; if [ -d "bkc-explorer" ]; then cd bkc-explorer; else git clone https://github.com/bitkubchain/bkc-explorer.git -b internal_test; cd bkc-explorer; fi; git status'
	}
	stage('Create Temp Config') {
            sshCommand remote: remote, command: 'ls'
            sshCommand remote: remote, command: 'pwd'
            sshCommand remote: remote, command: 'echo ">> Making temporary file"'
	    sshCommand remote: remote, command: 'cd jenkins/bkc-explorer; cp docker/Dockfile ./; cp docker/stop.sh ./'
	}
        stage('Build Docker image'){
            sshCommand remote: remote, command: 'echo ">> Building Docker image"'
	    sshCommand remote: remote, command: 'docker images'
            sshCommand remote: remote, command: 'docker image prune -f'

                //sh 'docker images'
                //echo "$EXPLORER_IMAGE"
	}
        stage('Remove Temp Config'){
            sshCommand remote: remote, command: 'echo ">> Removing temporary files"'
            sshRemove remote: remote, path: "jenkins/bkc-explorer/Dockerfile"
	    sshRemove remote: remote, path: "jenkins/bkc-explorer/stop.sh"
                //sh 'ls'
                //echo ">> Removing temporary Dockerfile"
                //sh 'rm Dockerfile'
        }
    }
}
