type UserLevels = {
    level_id: number;
    level_name: 'Admin' | 'User' | 'Company' | 'Guest';
};

type Users = {
    user_id: number;
    username: string;
    password: string;
    email: string;
    user_level_id: number;
    created_at: Date | string;
};

type MediaItems = { 
    media_id: string;
    user_id: number;
    filename: string; 
    filesize: number;
    media_type: string;
    title: string;
    description: string;
    created_at: Date | string;
};

type Comments = {
    media_id: number;
    user_id: number;
    created_at: Date;
};

type Approvals = {    
    approval_id: number;
    media_id: number;
    user_id: number;
    created_at: Date | string;
};


type UploadResult = {
    message: string;
    data?: {
        image: string;
    };
};

// type gymnastics to get rid of user_level_id from User type and replace it with level_name from UserLevel type
type UserWithLevel = Omit<Users, 'user_level_id'> &
  Pick<UserLevels, 'level_name'>;

type UserWithNoPassword = Omit<UserWithLevel, 'password'>;

type TokenContent = Pick<Users, 'user_id'> & Pick<UserLevels, 'level_name'>;

type MediaItemWithOwner = MediaItems & Pick<Users, 'username'>;

// for upload server
type FileInfo = {
  filename: string;
  user_id: number;
};

export type {
    UserLevels,
    Users,
    MediaItems,
    Comments,
    Approvals,
    UploadResult,
    UserWithLevel,
    UserWithNoPassword,
    TokenContent,
    MediaItemWithOwner,
    FileInfo,
}