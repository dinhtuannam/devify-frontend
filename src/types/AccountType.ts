export interface accountInformation {
    Id: string;
    UserName: string;
    Email: string;
    RoleId: string;
}

export interface accountInformationResponse {
    success: boolean;
    message: string;
    data: accountInformation;
}
