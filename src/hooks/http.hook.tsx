
export const useHttp = () => {

    const request = async (url: RequestInfo, method = 'GET', body: string = null, headers: {[name: string]: string} = {'Content-Type': 'application/json'}) => {
            const response:Response = await fetch(url, {method, body, headers});
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
