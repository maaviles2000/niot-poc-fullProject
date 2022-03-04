def targetBranch = ghprbTargetBranch;
def sourceBranch = ghprbSourceBranch;
def pattern = "^(feature|^[0-9]*$)"
def prToDevelopExpression = targetBranch == 'develop' && sourceBranch.startsWith(pattern);

pipeline{
    agent any
    tools{
        nodejs "Node14"
    }
    stages{
        stage('User Story'){
            when{
                expression {
                    return prToDevelopExpression;
                }
            }
            steps{
                echo 'Opened pr to develop'
            }

        }
        // stage("Install dependencies"){
        //     steps{
        //         sh "npm install -g newman"
        //         sh "npm ci"
        //     }
        // }
        // stage('Sonarqube') {
        //     steps {
        //         echo '************* SONARQUBE *************'
        //         script {
        //             scannerHome = tool 'sonarscanner'
                    
        //             withSonarQubeEnv('sonarqube') {
        //                 sh "${scannerHome}/bin/sonar-scanner -Dproject.settings=./sonar-project.properties"
        //             }
        //         }
        //     }
        // }   
        // stage('Quality Gates') {
        //     steps {
        //         echo '************* QUALITY GATES *************'
        //         sleep(60)
        //         timeout(time: 1, unit: 'HOURS') {
        //             script  {
        //                 def qg = waitForQualityGate()
        //                 if (qg.status != 'OK') {
        //                     error "Pipeline aborted due to quality gate failure: ${qg.status}"
        //                 }
        //             }
        //         }
        //     }
        // }
        // stage("Static Tests"){
        //     steps{
        //         sh "npm run test"
        //     }
        // }
        // stage("Build Image"){
        //     steps{
        //         /*def packageJSONVersion = readJSON(file: 'package.json').version
        //         env.TAG=packageJSONVersion
        //         sh "docker build -t back-${TAG} ."*/
        //         echo "BUILDING IMAGE"
        //     }
        // }
        // /*TODO: RUN API IN BACKGROUND*/
        // stage("Run Api"){
        //     steps{
        //         script{
        //                 sh "JENKINS_NODE_COOKIE=dontKillMe && nohup node api/index.js"
        //             }
        //         } 
        //     }
        // }  
        // stage("Newman"){
        //     steps{
        //         sh "npm run newman"
        //     }
        // }
        /*TODO: UP ARTIFACT*/
    }
}
