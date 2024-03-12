import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private s3: AWS.S3;

  constructor() {
    // Initialisation de l'AWS SDK avec les informations d'identification appropriées
    this.s3 = new AWS.S3({
      accessKeyId: 'VOTRE_ACCESS_KEY_ID',
      secretAccessKey: 'VOTRE_SECRET_ACCESS_KEY',
      region: 'VOTRE_REGION'
    });
  }
  // Méthode pour uploader un fichier sur S3
  uploadFile(file: File, bucketName: string, key: string): Promise<any> {
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: file,
      ACL: 'public-read' // Optionnel : définir les autorisations d'accès au fichier
    };

    return this.s3.upload(params).promise();
  }

}
