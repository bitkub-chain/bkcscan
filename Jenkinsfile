pipeline {
    agent any
    stages {
        stage('Ansible') {
            steps {
                echo 'Start Ansible'
                sh 'ansible-playbook /etc/ansible/playbooks/bkc-explorer-internal.yaml'
            }
        }
    }
}