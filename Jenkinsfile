def remote = [:]
remote.name = "bkc-explorer"
remote.host = "47.241.216.76"
remote.allowAnyHosts = true
EXPLORER_IMAGE = "bkc-explorer"
///GIT_REPO = 
///GIT_NAME = 

node {
    properties([pipelineTriggers([githubPush()])])
    withCredentials([sshUserPrivateKey(credentialsId: 'internal_explorer_test', keyFileVariable: 'identity', passphraseVariable: 'passPhrase', usernameVariable: 'userName')]) {
        remote.user = userName
        remote.identityFile = identity
        remote.passphrase = passPhrase
	stage('Clone git repository'){
	    sshCommand remote: remote, command: 'if [ -d "jenkins" ]; then cd jenkins; else mkdir jenkins; cd jenkins; fi'
	    sshCommand remote: remote, command: 'ls'
	    sshCommand remote: remote, command: 'cd jenkins; if [ -d "bkc-explorer" ]; then cd bkc-explorer; git pull; else git clone https://github.com/bitkubchain/bkc-explorer.git -b internal_test; cd bkc-explorer; fi; git status'
	}
	stage('Create Temp Config') {
            sshCommand remote: remote, command: 'ls'
            sshCommand remote: remote, command: 'pwd'
            sshCommand remote: remote, command: 'echo ">> Making temporary file"'
	    sshCommand remote: remote, command: 'cd jenkins/bkc-explorer; source env_testnet.sh; cp docker/Dockerfile ./; cp docker/stop.sh ./'
	    sshCommand remote: remote, command: 'echo ">> Removing old (and stopped) containers.."'
	    sshCommand remote: remote, command: "docker ps -a | grep Exited | awk '{print $1}' | xargs docker container rm; sleep 1;"
	}
        stage('Build Docker image'){
            sshCommand remote: remote, command: 'echo ">> Cleaning Docker image"'
	    sshCommand remote: remote, command: 'docker images'
            sshCommand remote: remote, command: 'docker image prune -f'
	    sshCommand remote: remote, command: 'echo ">> Building image"'
	    sshCommand remote: remote, command: 'cd jenkins/bkc-explorer; docker build -t bkc-explorer ./'
                //sh 'docker images'
                //echo "$EXPLORER_IMAGE"
	}
	stage('Deploy Blockscout'){
            //sshCommand remote: remote, command: 'echo ">> Deploying Postgres"'
            //sshCommand remote: remote, command: 'cd jenkins/bkc-explorer/docker; make -f Makefile.local postgres'
	    sshCommand remote: remote, command: 'echo ">> Deploying Blockscout"'
	    //sshCommand remote: remote, command: 'docker stop bkc-explorer; docker rm bkc-explorer'
	    //sshScript remote: remote, script: "jenkins/bkc-explorer/stop.sh"
            //sshCommand remote: remote, command: 'cd jenkins/bkc-explorer/docker; make -f Makefile.local start'
	    sshCommand remote: remote, command: 'cd jenkins/bkc-explorer/docker/scripts; ./mainnet.sh'
	    sshCommand remote: remote, command: 'docker ps -a'
	    //sshCommand remote: remote, command: 'for i in {1..10}; do echo \"Loop \$i \"; sleep 1; done; curl localhost:80'
                //sh 'docker images'
                //echo "$EXPLORER_IMAGE"
        }
        stage('Remove Temp Config'){
            sshCommand remote: remote, command: 'echo ">> Removing temporary files"'
	    sshCommand remote: remote, command: 'cd jenkins/bkc-explorer; rm Dockerfile stop.sh'
	    sshCommand remote: remote, command: 'docker images'
            sshCommand remote: remote, command: 'docker image prune -f'
	    //sshRemove remote: remote, path: "jenkins/bkc-explorer/Dockerfile"
	    //sshRemove remote: remote, path: "jenkins/bkc-explorer/stop.sh"
                //sh 'ls'
                //echo ">> Removing temporary Dockerfile"
                //sh 'rm Dockerfile'
        }
    }
}
