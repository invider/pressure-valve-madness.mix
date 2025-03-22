function environment() {
    for (const prop in env.config) {
        if (prop.startsWith('debug')) {
            env[prop] = env.config[prop]
        }
    }
    env.debug = !!env.config.debug // make sure 'debug' flag is always defined
}
environment.Z = 1
