import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../axios', () => ({
    axiosInstance: { defaults: { headers: { common: {} } } },
}));

describe('federatedLearningManagementServiceClient', () => {
    beforeEach(() => {
        vi.resetModules();
        vi.doMock('@paper-decentralized-ai/federated-learning-management-service-client', () => ({
            Configuration: vi.fn().mockImplementation(function (this: object, opts: object) {
                Object.assign(this, opts);
            }),
            JobsApi: vi.fn().mockImplementation(function (this: object) {
                Object.assign(this, { _isJobsApi: true });
            }),
        }));
    });

    it('exports federatedLearningJobsApi', async () => {
        const { federatedLearningJobsApi } = await import('../federatedLearningManagementServiceClient');
        expect(federatedLearningJobsApi).toBeDefined();
    });

    it('JobsApi is constructed once', async () => {
        const { JobsApi } = await import('@paper-decentralized-ai/federated-learning-management-service-client');
        await import('../federatedLearningManagementServiceClient');
        expect(JobsApi).toHaveBeenCalledOnce();
    });

    it('Configuration is called with empty basePath', async () => {
        const { Configuration } = await import('@paper-decentralized-ai/federated-learning-management-service-client');
        await import('../federatedLearningManagementServiceClient');
        const callArg = vi.mocked(Configuration).mock.calls[0]?.[0] as { basePath: string };
        expect(callArg?.basePath).toBe('');
    });
});
