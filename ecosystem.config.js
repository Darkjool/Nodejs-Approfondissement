module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      // Lancement de 3 tâches en parralèle
      instances: 3,
      // Mode cluster
      exec_mode: "cluster", 
      // Si erreur => Fichier .log
      error_file: "./logs/err.log", 
      env_production: {
        NODE_ENV: "production",
      },
      // Limite RAM = 200mo
      max_memory_restart: "200M", 
    },
  ],
};
