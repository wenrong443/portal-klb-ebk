import createAuthService from './authService';
import createManagementService from './managementService';
import createLookupService from './lookupService';
import createAnnouncementService from './announcementService';
import createSettingService from './settingService';
import createBankService from './bankService';
import createReferrerService from './referrerService';
import createAccountService from './accountService';
import createUserService from './userService';
import createMembershipService from './membershipService';
import createMissionService from './missionService';
import createRankingService from './rankingService';
import createInvestmentService from './investment';
import createCollectMoneyBankService from './collectMoneyBankService';
import createMoneyLogsService from './moneyLogsService';
import createStatisticService from './statisticService';
import createSlideshowService from './slideshowService';
import createOperationLogsService from './operationLogsService';
import createStaticPageService from './staticPageService';
import createMineProductService from './mineproduct';
import createMinePackageService from './minepackage';
import createPromoCodeService from './promoCodeService';
import createRankingModeService from './rankingModeService';
import createFnqService from './fnqService';
import createRedPacketService from './redpacketService';
import createMineBoostService from './mineBoostService';
import createReviewService from './reviewService';
import createPageBackgroundService from './pageBackgroundService';

export default function createService(config) {
    return {
        authService: createAuthService(config),
        managementService: createManagementService(config),
        lookupService: createLookupService(config),
        announcementService: createAnnouncementService(config),
        settingService: createSettingService(config),
        bankService: createBankService(config),
        referrerService: createReferrerService(config),
        accountService: createAccountService(config),
        userService: createUserService(config),
        membershipService: createMembershipService(config),
        missionService: createMissionService(config),
        rankingService: createRankingService(config),
        investmentService: createInvestmentService(config),
        mineProductService: createMineProductService(config),
        minePackageService: createMinePackageService(config),
        collectMoneyBankService: createCollectMoneyBankService(config),
        moneyLogsService: createMoneyLogsService(config),
        statisticService: createStatisticService(config),
        slideshowService: createSlideshowService(config),
        operationService: createOperationLogsService(config),
        staticPageService: createStaticPageService(config),
        promoCodeService: createPromoCodeService(config),
        rankingModeService: createRankingModeService(config),
        fnqService: createFnqService(config),
        redPacketService: createRedPacketService(config),
        mineBoostService: createMineBoostService(config),
        reviewService: createReviewService(config),
        pageBackgroundService: createPageBackgroundService(config),
    }
}