import crypto from 'crypto';

export class EncryptionUtil {
    private static readonly ALGORITHM = 'aes-256-gcm';
    private static readonly KEY = process.env.ENCRYPTION_KEY || crypto.randomBytes(32);
    private static readonly IV_LENGTH = 16;

    static encrypt(text: string): { encryptedData: string; iv: string; authTag: string } {
        const iv = crypto.randomBytes(this.IV_LENGTH);
        const cipher = crypto.createCipheriv(this.ALGORITHM, this.KEY, iv);
        
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        return {
            encryptedData: encrypted,
            iv: iv.toString('hex'),
            authTag: cipher.getAuthTag().toString('hex')
        };
    }

    static decrypt(encrypted: string, iv: string, authTag: string): string {
        const decipher = crypto.createDecipheriv(
            this.ALGORITHM, 
            this.KEY, 
            Buffer.from(iv, 'hex')
        );
        decipher.setAuthTag(Buffer.from(authTag, 'hex'));
        
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        
        return decrypted;
    }
}
