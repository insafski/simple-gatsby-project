export default class Api {
    base(path, options, onSuccess = Function, onError = Function) {
        fetch(`${process.env.API_ENDPOINTs}${path}`, options)
            .then((res) => res.json())
            .then((res) => onSuccess(res))
            .catch((error) => onError(error));
    }

    signIn(body) {
        return new Promise((resolve, reject) => {
            this.base(
                "/signin",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    mode: "cors",
                    body: JSON.stringify(body),
                },
                (data) => {
                    if (data.auth) {
                        // TODO: use jwt
                        // localStorage.setItem("car-token", "");
                        resolve(data);
                    } else {
                        reject(data);
                    }
                },
                (error) => {
                    console.error("Error", error);
                    reject(error);
                }
            );
        });
    }

    signUp(body) {
        return new Promise((resolve, reject) => {
            this.base(
                "/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                },
                (data) => {
                    if (data.auth) {
                        // TODO: use jwt
                        // localStorage.setItem("car-token", "");
                        resolve(data);
                    } else {
                        reject(data);
                    }
                },
                (error) => {
                    console.error("Error", error);
                    reject(error);
                }
            );
        });
    }

    signOut() {
        return new Promise((resolve, reject) => {
            this.base(
                "/auth",
                {
                    method: "DELETE",
                },
                (data) => resolve(data),
                (error) => reject(error)
            );
        });
    }

    getSome() {
        return new Promise((resolve, reject) => {
            this.base(
                "/getCars",
                {
                    mode: "cors",
                    credentials: "include",
                },
                (data) => resolve(data),
                (error) => reject(error)
            );
        });
    }
}
