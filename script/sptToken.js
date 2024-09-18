
const url = "";
const client_id = "";
const client_secret = "";

let tokenData = null
let sptToken = async () => {
    if (tokenData) {
        if (checkIfIsExpired()) {
            tokenData = await refreshToken()
            return tokenData.access_token
        } else {
            return tokenData.access_token
        }
    } else {
        tokenData = await refreshToken()
        return tokenData.access_token
    }
}

function checkIfIsExpired() {
    if (tokenData.expires_in <= 10) {
        return true
    } else {
        return false
    }
}

async function getNewToken() {

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    try {

        return fetch(`${url}?${params}`, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${window.btoa(`${client_id}:${client_secret}`)}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then(res => {
                return res.json()
                    .then(data => {
                        // console.log(data.access_token)
                        return data
                    })
            })
    } catch (error) {
        console.error(error);
    }
}

async function refreshToken() {
    const myObj = await getNewToken()
    return myObj

}

async function getTolken(wantNewOne = false) {


    if ((sptToken == null) || (wantNewOne == true)) {
        sptToken = await refreshToken()
        return sptToken
    }
}

export {sptToken, tokenData}
