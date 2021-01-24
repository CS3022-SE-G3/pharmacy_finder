
/** 
 * @description Render home page
 *
*/
const viewHomePage = async (request, response) => {
    try {
        return response.status(200).render('system_admin/home', {
            pageTitle: 'Home'
        });
    }
    catch (error) {
        var err_msg = "Internal server error " + error.message;
        console.log(error);

        return response.render('500', {
            err_data: err_msg
        });
    }
}

exports.viewHomePage = viewHomePage;

