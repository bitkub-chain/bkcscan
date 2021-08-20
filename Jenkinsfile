def getCurrentBranch () {
        return sh (
          script: 'git branch --contains ${commit}',
//        script: 'git rev-parse --abbrev-ref HEAD',
        returnStdout: true
    ).trim()
}


def notifyLINE(status) {
    sh 'git rev-parse HEAD > commit'
    def commit = readFile('commit').trim()
//    def headbranch = "staging"
    def token = "o0oMzl6Wxitff8KGwPvVjVLaq19XMbqXiRGMi1QCeYK"
    def jobName = env.JOB_NAME +" on branch "+ "${env.GIT_BRANCH}"
    def buildNo = env.BUILD_NUMBER
    
    def url = 'https://notify-api.line.me/api/notify'
    def message = "${jobName}, Build #${buildNo} ${status} \r\n"
    sh "curl ${url} -H 'Authorization: Bearer ${token}' -F 'message=${message}'"
}

pipeline {
    agent any
    stages {
        stage('Ansible') {
            steps {
                //echo 'Start Ansible'
                //sh 'ansible-playbook /etc/ansible/playbooks/PRD-explorer-mirror-bkcscan-com.yaml'
		echo "parameter is $params.build_on"
                if (params.build_on == "main") {
		  echo "main"
		} else if (params.build_on == "mirror") {
                  echo "mirror"
		}
            }
        }
    }
     post{
        success{
          notifyLINE("succeed")
      }
      failure{
          notifyLINE("failed")
      }
    }
}
