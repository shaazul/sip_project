const currentOrigin = window.location.origin;

// Default API endpoint (fallback)
let apiEndPoint = 'https://htaicc.hospital.rdmsite.com';
let api = '/api/v1';
let routeUnity = '';
let routeTo = 'http://localhost:4201';
let routeMDT = '';
let routeToLogin = 'http://localhost:4201';

// Check the current origin and set apiEndPoint accordingly
if (currentOrigin.startsWith('http://localhost:4201')) {
    apiEndPoint = 'https://htaicc.hospital.rdmsite.com';
    routeTo = 'http://localhost:4203'; //uc view
    routeMDT = 'http://localhost:4204'; // mdt view
    routeUnity = ''
    routeToLogin = 'http://localhost:4201'; //admin view
}
// else if (currentOrigin.startsWith('https://htaicc.hospital.rdmsite.com/admin/')) {
//     // apiEndPoint = 'https://htaicc.hospital.rdmsite.com';
//     // routeTo = 'https://htaicc.hospital.rdmsite.com/uc/';
//     // routeToLogin = 'https://htaicc.hospital.rdmsite.com/admin/';

//     // Use Angular dev proxy for API to avoid CORS
//     apiEndPoint = 'https://htaicc.hospital.rdmsite.com';
//     routeTo = 'https://htaicc.hospital.rdmsite.com/uc';
//     routeToLogin = 'https://htaicc.hospital.rdmsite.com/admin';
// }
else if (currentOrigin.startsWith('https://htaicc.hospital.rdmsite.com')) {
    // Running on production host
    apiEndPoint = 'https://htaicc.hospital.rdmsite.com';
    routeTo = 'https://htaicc.hospital.rdmsite.com'; // uc view
    routeUnity = 'https://htaicc.hospital.rdmsite.com'; // unity view
    routeMDT = 'https://htaicc.hospital.rdmsite.com'; // mdt view
    routeToLogin = 'https://htaicc.hospital.rdmsite.com/admin'; //admin view
}
else if (currentOrigin.startsWith('http://178.128.53.199')) {
     // Running on production host
    apiEndPoint = 'http://178.128.53.199';
    routeTo = 'http://178.128.53.199'; // uc view
    routeUnity = 'http://178.128.53.199'; // unity view
    routeMDT = 'http://178.128.53.199'; // mdt view
    routeToLogin = 'http://178.128.53.199/admin/'; //admin view
}
// } else if (currentOrigin.startsWith('https://htaicc.hospital.rdmsite.com')) {
//     apiEndPoint = 'https://htaicc.hospital.rdmsite.com';
//     routeTo = 'https://htaicc.hospital.rdmsite.com/admin';
//     routeToLogin = 'https://htaicc.hospital.rdmsite.com/admin/';
// } else if (currentOrigin.startsWith('https://htaicc.hospital.rdmsite.com')) {
//     apiEndPoint = 'https://htaicc.hospital.rdmsite.com';
//     routeTo = 'https://htaicc.hospital.rdmsite.com/admin';
//     routeToLogin = 'https://htaicc.hospital.rdmsite.com/admin/';
// }

export const environment = {
    production: true,
    apiEndPoint: apiEndPoint,
    api_base: api,
    routeTo: routeTo,
    routeMDT: routeMDT,
    routeUnity: routeUnity,
    routeToLogin: routeToLogin
};
