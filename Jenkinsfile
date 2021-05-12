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
    def headbranch = "test"
    def token = "o0oMzl6Wxitff8KGwPvVjVLaq19XMbqXiRGMi1QCeYK"
    def jobName = env.JOB_NAME +" on branch "+ "{$headbranch}"
    def buildNo = env.BUILD_NUMBER
    
    def url = 'https://notify-api.line.me/api/notify'
    def message = "${jobName}, Build #${buildNo} ${status} \r\n"
    sh "curl ${url} -H 'Authorization: Bearer ${token}' -F 'message=${message}'"
}

pipeline{  
  agent any
    tools {nodejs "node"}
    stages {
          stage('Github testing'){
            steps{
              script{
                sh 'pwd'
                sh 'ls'
                sh 'echo "owen was here" > test.txt'
                sh 'cat test.txt'
                sh 'rm -rf test.txt'
              }
            }
          }
        stage('Set ENV'){
           steps{
              script{
                sh 'cat setup_env_variables.sh'
                sh 'source setup_env_variables.sh'
              }
           }
        }
        stage('Building Image'){
          steps{
              script {
		sh 'cat docker/Dockerfile'
                sh 'docker build -t bitkubchain-explorer -f docker/Dockerfile ./'
              } 
           }   
        }
        stage('Deploy postgres with Makefile') {
            steps{
                script {
//                  sh 'echo "Moving into docker directory.."'
//                  sh 'cd docker'
                  sh 'make -f docker/Makefile postgres'
                 }
             }
          }
          stage('Deploy blockscout') {
              steps{
                  script {
                        sh "docker ps | grep bkc-explorer | awk '{print $1}' | xargs docker container stop"
			sh "docker ps -a | grep bkc-explorer | awk '{print $1}' | xargs docker container rm"
                        sh 'make -f docker/Makefile start'
                      }
                   }
                }
          stage('Prune unused image') {
              steps{
                  script {
                        sh 'docker ps'
                        sh 'docker ps -a'
                        sh 'docker images'
                        sh 'echo ">> Pruning images..."'
                        sh 'docker image prune -f'
                        sh 'docker images'
                      }
                   }
                } 
           }
    }
   post{
      success{
       notifyLINE("succeed.")
   }
   failure{
       notifyLINE("failed.")
   }
 }
}

