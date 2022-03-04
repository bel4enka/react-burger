export const useHttp = () => {

    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        try {
            const response = await fetch(url, {method, body, headers});
            if (!response.ok) {
              new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            return await response.json();

        } catch(e) {
            console.log(e)
        }
    };

    return {request}
}
