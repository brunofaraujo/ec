import { CertificateModule } from './certificate.module';

describe('certificateModule', () => {
  let certificateModule: CertificateModule;

  beforeEach(() => {
    certificateModule = new CertificateModule();
  });

  it('should create an instance', () => {
    expect(certificateModule).toBeTruthy();
  });
});
