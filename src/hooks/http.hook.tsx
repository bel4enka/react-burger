export const useHttp = () => {

    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
            const response = await fetch(url, {method, body, headers});
              if (!response.ok) {
                await response.json().then(data => {
                  throw new Error(data.message)
                })
              } else {
                return await response.json();
              }
    };

    return {request}
}
