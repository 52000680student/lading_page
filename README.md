## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Upload the .next folder to Netlify
```

### Traditional Hosting

```bash
npm run build
npm start
```

### Build docker image

```bash
docker build -t registry.iolis.solutions/iolis-mednova/landingpage:TAG .
docker push registry.iolis.solutions/iolis-mednova/landingpage:TAG
```
