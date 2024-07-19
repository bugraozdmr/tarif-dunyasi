## TARIF DUNYASI
It's basically the site that you can learn how to cook better with other peoples recipe.

<a href="(https://github.com/bugraozdmr/tarif-dunyasi/blob/main/github_photos/1.png" target="_blank"><img src="https://raw.githubusercontent.com/bugraozdmr/tarif-dunyasi/main/github_photos/1.png"/></a>
<hr>
<a href="(https://github.com/bugraozdmr/tarif-dunyasi/blob/main/github_photos/2.png" target="_blank"><img src="https://raw.githubusercontent.com/bugraozdmr/tarif-dunyasi/main/github_photos/2.png"/></a>
<hr>
<a href="(https://github.com/bugraozdmr/tarif-dunyasi/blob/main/github_photos/3.png" target="_blank"><img src="https://raw.githubusercontent.com/bugraozdmr/tarif-dunyasi/main/github_photos/3.png"/></a>
<hr>
<a href="(https://github.com/bugraozdmr/tarif-dunyasi/blob/main/github_photos/4.png" target="_blank"><img src="https://raw.githubusercontent.com/bugraozdmr/tarif-dunyasi/main/github_photos/4.png"/></a>
<hr>
<a href="(https://github.com/bugraozdmr/tarif-dunyasi/blob/main/github_photos/5.png" target="_blank"><img src="https://raw.githubusercontent.com/bugraozdmr/tarif-dunyasi/main/github_photos/5.png"/></a>
<hr>
<a href="(https://github.com/bugraozdmr/tarif-dunyasi/blob/main/github_photos/6.png" target="_blank"><img src="https://raw.githubusercontent.com/bugraozdmr/tarif-dunyasi/main/github_photos/6.png"/></a>
<hr>
<a href="(https://github.com/bugraozdmr/tarif-dunyasi/blob/main/github_photos/7.png" target="_blank"><img src="https://raw.githubusercontent.com/bugraozdmr/tarif-dunyasi/main/github_photos/7.png"/></a>
<hr>
<a href="(https://github.com/bugraozdmr/tarif-dunyasi/blob/main/github_photos/8.png" target="_blank"><img src="https://raw.githubusercontent.com/bugraozdmr/tarif-dunyasi/main/github_photos/8.png"/></a>
<hr>
<a href="(https://github.com/bugraozdmr/tarif-dunyasi/blob/main/github_photos/9.png" target="_blank"><img src="https://raw.githubusercontent.com/bugraozdmr/tarif-dunyasi/main/github_photos/9.png"/></a>
<hr>


## Getting Started

First, your gonna have to add env values:

```bash
## CONNECTION STRING
DATABASE_URL="DATABASE CONNECTION STRING"

AUTH_SECRET = "USE AUTH SECRET"

## GITHUB
GITHUB_CLIENT_ID = GIT_CLIENT_ID
GITHUB_CLIENT_SECRET = GIT_CLIENT_SECRET

## GOOGLE
GOOGLE_CLIENT_ID = GIT_CLIENT_ID
GOOGLE_CLIENT_SECRET = GOOGLE_CLIENT_SECRET

## RESEND
RESEND_API_KEY = resend_api_ket

## DYNAMIC DOMAIN NAME

NEXT_PUBLIC_APP_URL = "exp : http://localhost:3000"

## CLAUDINARY
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="NAME"
```

## For Prisma
```bash
$ npx prisma generate
$ npx prisma db push
```

## READ

Some features disabled due to not having email server.

- 2 Factor Authentication
- Send confirmation mail
- Not let the person enter the site without confirmed email

If you want to change these features find em on the code and do as I commented.

## Deployed on Vercel

 [Tarif Dünyası](https://tarif-dunyasi.vercel.app/)

Fallow my github account 🥳