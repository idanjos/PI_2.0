#Requirements
//Docker engine installed
	
	docker run -d --hostname RABBITMQ --name RABBITMQ -p 5672:5672 -p 15672:15672  rabbitmq:3-management

//Download link
	unzip bio_autoencoder_2.0.zip && cd bio_autoencoder_2.0/
	docker build -f DockerFile . -t biogen:latest
	docker run -ti --name TaskSupervisor  --add-host=RABBITMQ:172.17.0.1  -v /mnt/c/Users/Work/Documents/pwd/baselines:/home/bio_autoencoder/baselines -v /mnt/c/Users/Work/Documents/pwd/models:/home/bio_autoencoder/models -v /mnt/c/Users/Work/Documents/pwd/raw:/home/bio_autoencoder/raw biogen bash -c "cd /home/bio_autoencoder/ && unzip -o models.zip && -o unzip baselines.zip && unzip -o raw.zip &&  python3 /home/bio_autoencoder/TaskSupervisor.py"

	docker run -ti --name Supervisor  --add-host=RABBITMQ:172.17.0.1  -v /mnt/c/Users/Work/Documents/pwd/baselines:/home/bio_autoencoder/baselines -v /mnt/c/Users/Work/Documents/pwd/models:/home/bio_autoencoder/models -v /mnt/c/Users/Work/Documents/pwd/raw:/home/bio_autoencoder/raw biogen bash -c "cd /home/bio_autoencoder/ && unzip -o models.zip && unzip -o baselines.zip && unzip -o raw.zip && python3 /home/bio_autoencoder/Supervisor.py"


//Download link
	unzip PI_2.0.zip && cd PI_2.0/
	docker build -f DockerFile . -t virhus:latest
	docker run -ti --name virhus -h VIRHUS --add-host=RABBITMQ:172.17.0.1 -p 3003:3003 -v /mnt/c/Users/Work/Documents/pwd/baselines:/home/PI_2.0/src/bio_autoencoder/baselines -v /mnt/c/Users/Work/Documents/pwd/models:/home/PI_2.0/src/bio_autoencoder/models -v /mnt/c/Users/Work/Documents/pwd/raw:/home/PI_2.0/src/bio_autoencoder/raw virhus bash -c "cd $VIRHUS_DIR/ && go build virhus && go run virhus"