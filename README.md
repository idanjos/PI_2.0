#Requirements

Docker engine installed
1) Pulling the rabbitmq module

		docker run -d --hostname RABBITMQ --name RABBITMQ -p 5672:5672 -p 15672:15672  rabbitmq:3-management

2.1) Download Loadbalance + workers

	https://drive.google.com/file/d/1e1Z6UJglHr6M3e_eNlcqbJgTQpHOVp5A/view?usp=sharing	
	unzip bio_autoencoder_2.0.zip && cd bio_autoencoder_2.0/
	
2.2) Build the image

	docker build -f DockerFile . -t biogen:latest


2.3) Run the loadbalancers

	docker run -ti --name TaskSupervisor  --add-host=RABBITMQ:172.17.0.1  -v /mnt/c/Users/Work/Documents/pwd/baselines:/home/bio_autoencoder/baselines -v 	/mnt/c/Users/Work/Documents/pwd/models:/home/bio_autoencoder/models -v /mnt/c/Users/Work/Documents/pwd/raw:/home/bio_autoencoder/raw biogen bash -c "cd /home/bio_autoencoder/ && unzip -o models.zip && -o unzip baselines.zip && unzip -o raw.zip &&  python3 /home/bio_autoencoder/TaskSupervisor.py"

	docker run -ti --name Supervisor  --add-host=RABBITMQ:172.17.0.1  -v /mnt/c/Users/Work/Documents/pwd/baselines:/home/bio_autoencoder/baselines -v /mnt/c/Users/Work/Documents/pwd/models:/home/bio_autoencoder/models -v /mnt/c/Users/Work/Documents/pwd/raw:/home/bio_autoencoder/raw biogen bash -c "cd /home/bio_autoencoder/ && unzip -o models.zip && unzip -o baselines.zip && unzip -o raw.zip && python3 /home/bio_autoencoder/Supervisor.py"

3.1) Download Virhus Server

	https://drive.google.com/file/d/1urrWkU_xn2W36-iULrea84EbGKmu6qC4/view?usp=sharing
	unzip PI_2.0.zip && cd PI_2.0/
3.2) Unzip and build the image

	
	docker build -f DockerFile . -t virhus:latest

3.3) Run the Image

	docker run -ti --name virhus -h VIRHUS --add-host=RABBITMQ:172.17.0.1 -p 3003:3003 -v /mnt/c/Users/Work/Documents/pwd/baselines:/home/PI_2.0/src/bio_autoencoder/baselines -v /mnt/c/Users/Work/Documents/pwd/models:/home/PI_2.0/src/bio_autoencoder/models -v /mnt/c/Users/Work/Documents/pwd/raw:/home/PI_2.0/src/bio_autoencoder/raw virhus bash -c "cd $VIRHUS_DIR/ && go build virhus && go run virhus"
