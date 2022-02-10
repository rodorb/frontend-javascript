export function decodeToken(token) {
    let decodedToken;
    try {
        const tokenToDecode = token.split(".")[1];
        decodedToken = JSON.parse(atob(tokenToDecode));
    } catch (error) {
        return null;
    }
    return decodedToken;
}