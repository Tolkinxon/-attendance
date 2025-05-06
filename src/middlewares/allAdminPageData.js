export default async function allAdminPageData(req, res, next){
    const employee = await req.readFile("employee"); 
    const control = await req.readFile("control");

    req.allAdminPageData = { employee, control };
    return next();
}