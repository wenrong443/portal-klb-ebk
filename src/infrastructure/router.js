import { createRouter, createWebHistory } from 'vue-router';
import { all, claims } from 'model/claims';
import LoginPage from 'views/Auth/LoginPage';

import ManagementPage from 'views/Management/ManagementPage';
import AdminSummaryPage from 'views/Management/AdminSummaryPage';
import AdminAddPage from 'views/Management/AdminAddPage';
import AdminEditPage from 'views/Management/AdminEditPage';

import DepartmentSummaryPage from 'views/Management/DepartmentSummaryPage';
import DepartmentAddPage from 'views/Management/DepartmentAddPage';
import DepartmentEditPage from 'views/Management/DepartmentEditPage';

import CategorySummaryPage from 'views/Announcement/CategorySummaryPage';
import CategoryAddPage from 'views/Announcement/CategoryAddPage';
import CategoryEditPage from 'views/Announcement/CategoryEditPage';

import AnnouncementPage from 'views/Announcement/AnnouncementPage';
import AnnouncementSummaryPage from 'views/Announcement/SummaryPage';
import AnnouncementEditPage from 'views/Announcement/EditPage';
import AnnouncementAddPage from 'views/Announcement/AddPage';
import AdminLoginPage from 'views/Auth/AdminPage';
import UserLoginPage from 'views/Auth/UserPage';

import BankSummaryPage from 'views/Bank/SummaryPage';
import BankEditPage from 'views/Bank/EditPage';
import BankAddPage from 'views/Bank/AddPage';
import CollectMoneyBankSummaryPage from 'views/Bank/CollectMoneyBankSummaryPage';
import CollectMoneyBankAddPage from 'views/Bank/CollectMoneyBankAddPage';
import CollectMoneyBankEditPage from 'views/Bank/CollectMoneyBankEditPage';

import MembershipPage from 'views/Membership/MembershipPage';
import MembershipSummaryPage from 'views/Membership/SummaryPage';
import MembershipEditPage from 'views/Membership/EditPage';
import MembershipEditPageL1 from 'views/Membership/EditPageL1';
import MembershipAddPage from 'views/Membership/AddPage';

import ReviewTaskPage from 'views/ReviewTask/ReviewTaskPage';
import ReviewTaskSummaryPage from 'views/ReviewTask/ReviewTaskSummaryPage';
import ReviewTaskAddPage from 'views/ReviewTask/ReviewTaskAddPage';
import ReviewTaskEditPage from 'views/ReviewTask/ReviewTaskEditPage';

import ReviewTaskTakenPage from 'views/ReviewTaskTaken/ReviewTaskTakenPage';
import ReviewTaskTakenSummaryPage from 'views/ReviewTaskTaken/ReviewTaskTakenSummaryPage';

import ProfilePage from 'views/Profile/ProfilePage';

import QRCodePage from 'views/QRCode/QRCodePage';
import QRCodeViewPage from 'views/QRCode/ViewPage';

import ChangePasswordPage from 'views/ChangePassword/ChangePasswordPage';
import ChangePasswordViewPage from 'views/ChangePassword/ViewPage';

import MissionSummaryPage from 'views/Mission/SummaryPage';
import MissionAddPage from 'views/Mission/AddPage';
import MissionEditPage from 'views/Mission/EditPage';

import FnqSummaryPage from 'views/Fnq/SummaryPage';
import FnqAddPage from 'views/Fnq/AddPage';
import FnqEditPage from 'views/Fnq/EditPage';

import MineProductPage from 'views/MineProduct/MineProductPage';
import MineProductSummaryPage from 'views/MineProduct/SummaryPage';
import MineProductAddPage from 'views/MineProduct/AddPage';
import MineProductPricePage from 'views/MineProduct/ProductPricePage';

import MinePackagePage from 'views/MinePackage/MinePackagePage';
import MinePackageSummaryPage from 'views/MinePackage/SummaryPage';
import MinePackageAddPage from 'views/MinePackage/AddPage';
import MinePackageEditPage from 'views/MinePackage/EditPage';

import MineBoostPage from 'views/MineBoost/MineBoostPage';
import MineBoostSummaryPage from 'views/MineBoost/MineBoostSummaryPage';
import MineBoostAddPage from 'views/MineBoost/MineBoostAddPage';
import MineBoostEditPage from 'views/MineBoost/MineBoostEditPage';

import MinePackageSchedulePage from 'views/MinePackageSchedule/MinePackageSchedulePage';
import MinePackageScheduleSummaryPage from 'views/MinePackageSchedule/SummaryPage';
import MinePackageScheduleAddPage from 'views/MinePackageSchedule/AddPage';
import MinePackageScheduleEditPage from 'views/MinePackageSchedule/EditPage';

import StaticPageEditPage from 'views/StaticPage/EditPage';

import RankingPage from 'views/Ranking/RankingPage';
import RankingSummaryPage from 'views/Ranking/RankingSummaryPage';
import RankingAddPage from 'views/Ranking/RankingAddPage';
import RankingEditPage from 'views/Ranking/RankingEditPage';

import SlideshowSummaryPage from 'views/Slideshow/SlideshowSummaryPage';
import SlideshowAddPage from 'views/Slideshow/SlideshowAddPage';
import SlideshowEditPage from 'views/Slideshow/SlideshowEditPage';

import PageBackgroundSummaryPage from 'views/PageBackground/PageBackgroundSummaryPage';
import PageBackgroundAddPage from 'views/PageBackground/PageBackgroundAddPage';
import PageBackgroundEditPage from 'views/PageBackground/PageBackgroundEditPage';

import NormalUserPage from 'views/NormalUser/NormalUserPage';
import NormalUserSummaryPage from 'views/NormalUser/NormalUserSummaryPage';
import NormalUserDetailPage from 'views/NormalUser/NormalUserDetailPage';
import OnHoldUserDetailPage from 'views/ReviewTaskOnHold/OnHoldUserDetailPage';
import AddDepositManualFundPage from 'views/NormalUser/AddDepositManualFundPage';

import OperationLogsPage from 'views/OperationLogs/OperationLogsPage';
import OperationLogsSummaryPage from 'views/OperationLogs/OperationLogsSummaryPage';

import PromoCodeUsageSummaryPage from 'views/PromoCodeUsage/PromoCodeUsageSummaryPage';

import ExchangeLogsPage from 'views/ExchangeLogs/ExchangeLogsPage';
import ExchangeLogsSummaryPage from 'views/ExchangeLogs/ExchangeLogsSummaryPage';

import MoneyLogsPage from 'views/MoneyLogs/MoneyLogsPage';
import MoneyLogsSummaryPage from 'views/MoneyLogs/MoneyLogsSummaryPage';

import MoneyLogsPage2 from 'views/MoneyLogsByUser/MoneyLogsPage';
import MoneyLogsSummaryPage2 from 'views/MoneyLogsByUser/MoneyLogsSummaryPage';

import ReferrerPage from 'views/Referrer/ReferrerPage';
import ReferrerSummaryPage from 'views/Referrer/SummaryPage';
import ReferrerAddPage from 'views/Referrer/AddPage';

import AccountPage from 'views/Account/Page';
import AccountDepositSummaryPage from 'views/Account/DepositSummaryPage';
import AccountDepositDetailPage from 'views/Account/DepositDetailPage';
import AccountWithdrawSummaryPage from 'views/Account/WithdrawSummaryPage';
import AccountWithdrawDetailPage from 'views/Account/WithdrawDetailPage';
import AccountManualFundAddPage from 'views/Account/ManualFundAddPage';
import AccountManualFundSummaryPage from 'views/Account/ManualFundSummaryPage';

import SettingPage from 'views/Setting/SettingPage';
import SettingSummaryPage from 'views/Setting/SummaryPage';
import LanguageSummaryPage from 'views/Setting/LanguageSummaryPage';
import LanguageAddPage from 'views/Setting/LanguageAddPage';
import LanguageEditPage from 'views/Setting/LanguageEditPage';
import WhitelistIpSummaryPage from 'views/Setting/WhitelistIpSummaryPage';
import WhitelistIpAddPage from 'views/Setting/WhitelistIpAddPage';

import InvestmentPage from 'views/Investment/InvestmentPage';
import InvestmentFundSummaryPage from 'views/Investment/InvestmentFundSummaryPage';
import InvestmentFundEditPage from 'views/Investment/InvestmentFundEditPage';
import InvestmentFundDetailPage from 'views/Investment/InvestmentFundDetailPage';
import InvestmentFundAddPage from 'views/Investment/InvestmentFundAddPage';
import InvestmentBookingSummaryPage from 'views/Investment/InvestmentBookingSummaryPage';

import MineBookingSummaryPage from 'views/MineProduct/MineBookingSummaryPage';

import StatisticPage from 'views/Statistic/StatisticPage';
import StatisticGeneralSummaryPage from 'views/Statistic/GeneralSummaryPage';
import StatisticReviewSummaryPage from 'views/Statistic/ReviewSummaryPage';
import StatisticMineSummaryPage from 'views/Statistic/MineSummaryPage';

import StatisticGameInvestSummaryPage from 'views/Statistic/GameInvestSummaryPage';
import StatisticBurceForceIPSummaryPage from 'views/Statistic/BurceForceIPSummaryPage';


import PromoCodePage from 'views/PromoCode/PromoCodePage';
import PromoCodeSummaryPage from 'views/PromoCode/PromoCodeSummaryPage';
import PromoCodeAddPage from 'views/PromoCode/PromoCodeAddPage';
import PromoCodeEditPage from 'views/PromoCode/PromoCodeEditPage';
import MyTeamSummaryPage from 'views/Report/MyTeamSummaryPage.vue';

function loggedIn(to, from, next) {
    if (localStorage.token)
        next({ name: 'NormalUserSummaryPage' })
    else next()
}

const routes = [
    { path: '/', redirect: '/login' },
    {
        path: '/login', name: "LoginPage", component: LoginPage, beforeEnter: loggedIn,
        children: [
            { path: '', name: "AdminLoginPage", component: AdminLoginPage, meta: { roles: all } },
            { path: 'user', name: "UserLoginPage", component: UserLoginPage, meta: { roles: all } }
        ]
    },
    {
        path: '/profile', name: "ProfilePage", component: ProfilePage,
        children: [
            {
                path: 'view', name: "ProfileViewPage",
                component: () => import("views/Profile/ViewPage"),
                meta: {
                    roles: [claims.canViewProfile]
                },
            },
        ]
    },
    {
        path: '/qrcode', name: "QRCodePage", component: QRCodePage,
        children: [
            { path: 'view/:userId', name: "QRCodeViewPage", component: QRCodeViewPage, props: true, meta: { roles: all } },
        ]
    },
    {
        path: '/changepassword', name: "ChangePasswordPage", component: ChangePasswordPage,
        children: [
            { path: 'view', name: "ChangePasswordViewPage", component: ChangePasswordViewPage, meta: { roles: all } },
        ]
    },
    {
        path: '/management', name: "ManagementPage", component: ManagementPage,
        children: [
            { path: 'admin', name: "AdminSummaryPage", component: AdminSummaryPage, meta: { roles: [claims.canViewManagementAccount] } },
            { path: 'admin/edit/:userId', name: "AdminEditPage", component: AdminEditPage, props: true, meta: { roles: [claims.canEditManagementAccount] } },
            { path: 'admin/add', name: "AdminAddPage", component: AdminAddPage, meta: { roles: [claims.canEditManagementAccount] } },
            { path: 'department', name: "DepartmentSummaryPage", component: DepartmentSummaryPage, meta: { roles: [claims.canViewDepartment] } },
            { path: 'department/add', name: "DepartmentAddPage", component: DepartmentAddPage, meta: { roles: [claims.canEditDepartment] } },
            { path: 'department/edit/:departmentId', name: "DepartmentEditPage", component: DepartmentEditPage, props: true, meta: { roles: [claims.canEditDepartment] } },
        ]
    },
    {
        path: '/user/ranking', name: "RankingPage", component: RankingPage,
        children: [
            { path: 'admin', name: "RankingSummaryPage", component: RankingSummaryPage, meta: { roles: [claims.canViewRanking] } },
            { path: 'admin/edit/:recordId', name: "RankingEditPage", component: RankingEditPage, props: true, meta: { roles: [claims.canEditRanking] } },
            { path: 'admin/add', name: "RankingAddPage", component: RankingAddPage, meta: { roles: [claims.canEditRanking] } },
            { path: 'admin/mode', name: "RankingModeSummaryPage", component: () => import('views/RankingMode/SummaryPage.vue'), meta: { roles: [claims.canViewRankingModule] } },
            { path: 'admin/mode/add', name: "RankingModeAddPage", component: () => import('views/RankingMode/AddPage.vue'), meta: { roles: [claims.canEditRankingModule] } },
            { path: 'admin/mode/edit/:recordId', name: "RankingModeEditPage", component: () => import('views/RankingMode/EditPage.vue'), props: true, meta: { roles: [claims.canEditRankingModule] } },
        ]
    },
    {
        path: '/promocode', name: "PromoCodePage", component: PromoCodePage,
        children: [
            { path: 'list', name: "PromoCodeSummaryPage", component: PromoCodeSummaryPage, meta: { roles: [claims.canViewPromoCode] } },
            { path: 'edit/:recordId', name: "PromoCodeEditPage", component: PromoCodeEditPage, props: true, meta: { roles: [claims.canEditPromoCode] } },
            { path: 'add', name: "PromoCodeAddPage", component: PromoCodeAddPage, meta: { roles: [claims.canEditPromoCode] } },
            { path: 'usage', name: 'PromoCodeUsageSummaryPage', component: PromoCodeUsageSummaryPage, meta: { roles: [claims.canViewPromoCodeUsage] } }
        ]
    },
    {
        path: '/user/normal-user', name: "NormalUserPage", component: NormalUserPage,
        children: [
            {
                path: 'list', name: "NormalUserSummaryPage", component: NormalUserSummaryPage,
                meta: { roles: [claims.canViewUserInfo] }
            },
            {
                path: 'detail/:recordId', name: "NormalUserDetailPage", component: NormalUserDetailPage, props: true,
                meta: { roles: [claims.canViewUserInfo] }
            },
            {
                path: 'details-on-hold/:recordId', name: "OnHoldUserDetailPage", component: OnHoldUserDetailPage, props: true,
                meta: { roles: [claims.canEditTaskTaken] }
            },
            {
                path: 'add-deposit-record/:recordId/:isDeposit', name: "AddDepositRecordPage", component: AddDepositManualFundPage, props: true,
                meta: { roles: [claims.canAddDepositRecord] }
            },
            {
                path: 'add-manual-fund-record/:recordId/:isDeposit', name: "AddManualFundRecordPage", component: AddDepositManualFundPage, props: true,
                meta: { roles: [claims.canAddFreeCash] }
            }
        ]
    },
    {
        path: '/account/money-logs', name: "MoneyLogsPage", component: MoneyLogsPage,
        children: [
            { path: 'admin', name: "MoneyLogsSummaryPage", component: MoneyLogsSummaryPage, meta: { roles: [claims.canViewCashFlow] } },
        ]
    },
    {
        path: '/account2/money-logs', name: "MoneyLogsPage2", component: MoneyLogsPage2,
        children: [
            { path: 'admin', name: "MoneyLogsSummaryPage2", component: MoneyLogsSummaryPage2, props: true, meta: { roles: [claims.canViewCashFlow] } },
        ]
    },
    {
        path: '/operation-logs', name: "OperationLogsPage", component: OperationLogsPage,
        children: [
            { path: 'list', name: "OperationLogsSummaryPage", component: OperationLogsSummaryPage, meta: { roles: [claims.canViewOperationLog] } },
        ]
    },
    {
        path: '/exchange-logs', name: "ExchangeLogsPage", component: ExchangeLogsPage,
        children: [
            { path: 'list', name: "ExchangeLogsSummaryPage", component: ExchangeLogsSummaryPage, meta: { roles: [claims.canViewExchangeLog] } },
        ]
    },
    {
        path: '/announcement', name: "AnnouncementPage", component: AnnouncementPage,
        children: [
            { path: '', name: "AnnouncementSummaryPage", component: AnnouncementSummaryPage, meta: { roles: [claims.canViewAnnouncement] } },
            { path: 'edit/:announcementId', name: "AnnouncementEditPage", component: AnnouncementEditPage, props: true, meta: { roles: [claims.canEditAnnouncement] } },
            { path: 'add', name: "AnnouncementAddPage", component: AnnouncementAddPage, meta: { roles: [claims.canEditAnnouncement] } },
            { path: 'category', name: "CategorySummaryPage", component: CategorySummaryPage, meta: { roles: [claims.canViewCategory] } },
            { path: 'category/add', name: "CategoryAddPage", component: CategoryAddPage, meta: { roles: [claims.canEditCategory] } },
            { path: 'category/edit/:categoryId', name: "CategoryEditPage", component: CategoryEditPage, props: true, meta: { roles: [claims.canEditCategory] } },
        ]
    },
    {
        path: '/review-task', name: "MembershipPage", component: MembershipPage,
        children: [
            { path: 'membership', name: "MembershipSummaryPage", component: MembershipSummaryPage, meta: { roles: [claims.canViewMembership] } },
            { path: 'membership/edit/:recordId', name: "MembershipEditPage", component: MembershipEditPage, props: true, meta: { roles: [claims.canEditMembership] } },
            { path: 'membership/edit/l1/:recordId', name: "MembershipEditPageL1", component: MembershipEditPageL1, props: true, meta: { roles: [claims.canEditMembership] } },
            { path: 'membership/add', name: "MembershipAddPage", component: MembershipAddPage, meta: { roles: [claims.canEditMembership] } },
        ]
    },
    {
        path: '/review-task', name: "ReviewTaskPage", component: ReviewTaskPage,
        children: [
            { path: 'task', name: "ReviewTaskSummaryPage", component: ReviewTaskSummaryPage, meta: { roles: [claims.canViewTask] } },
            { path: 'task/edit/:recordId', name: "ReviewTaskEditPage", component: ReviewTaskEditPage, props: true, meta: { roles: [claims.canEditTask] } },
            { path: 'task/add', name: "ReviewTaskAddPage", component: ReviewTaskAddPage, meta: { roles: [claims.canEditTask] } },
        ]
    },

    {
        path: '/review-task', name: "ReviewTaskTakenPage", component: ReviewTaskTakenPage,
        children: [
            { path: 'taken', name: "ReviewTaskTakenSummaryPage", component: ReviewTaskTakenSummaryPage, meta: { roles: [claims.canViewTaskTaken] } },
        ]
    },
    {
        path: '/user/referrer', name: "ReferrerPage", component: ReferrerPage,
        children: [
            { path: '', name: "ReferrerSummaryPage", component: ReferrerSummaryPage, meta: { roles: [claims.canViewChangeReferrer] } },
            { path: 'add', name: "ReferrerAddPage", component: ReferrerAddPage, meta: { roles: [claims.canEditChangeReferrer] } }
        ]
    },
    {
        path: '/account', name: "AccountPage", component: AccountPage,
        children: [
            { path: '', name: "AccountDepositSummaryPage", component: AccountDepositSummaryPage, meta: { roles: [claims.canViewDeposit] } },
            { path: 'deposit', name: "AccountDepositSummaryPage", component: AccountDepositSummaryPage, meta: { roles: [claims.canViewDeposit] } },
            { path: 'deposit/detail/:recordId', name: "AccountDepositDetailPage", component: AccountDepositDetailPage, props: true, meta: { roles: [claims.canViewDeposit] } },
            { path: 'withdraw', name: "AccountWithdrawSummaryPage", component: AccountWithdrawSummaryPage, meta: { roles: [claims.canViewWithdraw] } },
            { path: 'withdraw/detail/:recordId', name: "AccountWithdrawDetailPage", component: AccountWithdrawDetailPage, props: true, meta: { roles: [claims.canViewWithdraw] } },
            { path: 'manualfund', name: "AccountManualFundSummaryPage", component: AccountManualFundSummaryPage, meta: { roles: [claims.canViewManualFund] } },
            { path: 'manualfund/add', name: "AccountManualFundAddPage", component: AccountManualFundAddPage, meta: { roles: [claims.canEditManualFund] } },
            { path: 'bank', name: "BankSummaryPage", component: BankSummaryPage, meta: { roles: [claims.canViewWithdrawWalletNetwork] } },
            { path: 'bank/edit/:recordId', name: "BankEditPage", component: BankEditPage, props: true, meta: { roles: [claims.canEditWithdrawWalletNetwork] } },
            { path: 'bank/add', name: "BankAddPage", component: BankAddPage, meta: { roles: [claims.canEditWithdrawWalletNetwork] } },
            { path: 'bank/collectmoney', name: "CollectMoneyBankSummaryPage", component: CollectMoneyBankSummaryPage, meta: { roles: [claims.canViewTopupWallet] } },
            { path: 'bank/collectmoney/add', name: "CollectMoneyBankAddPage", component: CollectMoneyBankAddPage, meta: { roles: [claims.canEditTopupWallet] } },
            { path: 'bank/collectmoney/edit/:recordId', name: "CollectMoneyBankEditPage", component: CollectMoneyBankEditPage, props: true, meta: { roles: [claims.canEditTopupWallet] } }
        ]
    },
    {
        path: '/setting', name: "SettingPage", component: SettingPage,
        children: [
            { path: 'general', name: "SettingSummaryPage", component: SettingSummaryPage, meta: { roles: [claims.canViewGeneralSetting] } },
            { path: 'language', name: "LanguageSummaryPage", component: LanguageSummaryPage, meta: { roles: [claims.canViewLanguage] } },
            { path: 'language/add', name: "LanguageAddPage", component: LanguageAddPage, meta: { roles: [claims.canEditLanguage] } },
            { path: 'language/edit/:recordId', name: "LanguageEditPage", component: LanguageEditPage, props: true, meta: { roles: [claims.canEditLanguage] } },
            { path: 'whitelist-ip', name: "WhitelistIpSummaryPage", component: WhitelistIpSummaryPage, meta: { roles: [claims.canViewWhitelistedIp] } },
            { path: 'whitelist-ip/add', name: "WhitelistIpAddPage", component: WhitelistIpAddPage, meta: { roles: [claims.canEditWhitelistedIp] } },
            { path: 'mission', name: "MissionSummaryPage", component: MissionSummaryPage, meta: { roles: [claims.canViewDailyMission] } },
            { path: 'mission/edit/:recordId', name: "MissionEditPage", component: MissionEditPage, props: true, meta: { roles: [claims.canEditGeneralMission] } },
            { path: 'mission/add', name: "MissionAddPage", component: MissionAddPage, meta: { roles: [claims.canEditGeneralMission] } },
            { path: 'static-page', name: "StaticPageEditPage", component: StaticPageEditPage, meta: { roles: [claims.canViewOtherSetting, claims.canEditOtherSetting] } },
            { path: 'fnq', name: "FnqSummaryPage", component: FnqSummaryPage, meta: { roles: [claims.canViewFaq] } },
            { path: 'fnq/edit/:recordId', name: "FnqEditPage", component: FnqEditPage, props: true, meta: { roles: [claims.canEditFaq] } },
            { path: 'fnq/add', name: "FnqAddPage", component: FnqAddPage, meta: { roles: [claims.canEditFaq] } },
            { path: 'slideshow/list', name: "SlideshowSummaryPage", component: SlideshowSummaryPage, meta: { roles: [claims.canViewSlideshow] } },
            { path: 'slideshow/edit/:recordId', name: "SlideshowEditPage", component: SlideshowEditPage, props: true, meta: { roles: [claims.canEditSlideshow] } },
            { path: 'slideshow/add', name: "SlideshowAddPage", component: SlideshowAddPage, meta: { roles: [claims.canEditSlideshow] } },
            { path: 'page-background/list', name: "PageBackgroundSummaryPage", component: PageBackgroundSummaryPage, meta: { roles: [claims.canViewSlideshow] } },
            { path: 'page-background/edit/:recordId', name: "PageBackgroundEditPage", component: PageBackgroundEditPage, props: true, meta: { roles: [claims.canEditSlideshow] } },
            { path: 'page-background/add', name: "PageBackgroundAddPage", component: PageBackgroundAddPage, meta: { roles: [claims.canEditSlideshow] } },
        ]
    },
    {
        path: '/mine/product', name: "MineProductPage", component: MineProductPage,
        children: [
            { path: 'admin', name: "MineProductSummaryPage", component: MineProductSummaryPage, meta: { roles: [claims.canViewMineProduct] } },
            { path: 'admin/price/:recordId', name: "MineProductPricePage", component: MineProductPricePage, props: true, meta: { roles: [claims.canEditMineProduct] } },
            { path: 'admin/edit/:recordId', name: "MineProductEditPage", component: () => import('views/MineProduct/EditPage.vue'), 
            props: true, meta: { roles: [claims.canEditMineProduct] } },
            { path: 'admin/add', name: "MineProductAddPage", component: MineProductAddPage, meta: { roles: [claims.canEditMineProduct] } },
            { path: 'booking/active', name: "MineBookingCancellationSummaryPage", component: MineBookingSummaryPage, meta: { roles: [claims.canViewMineBooking] } },
            { path: 'booking/history', name: "MineBookingHistorySummaryPage", component: MineBookingSummaryPage, meta: { roles: [claims.canViewMineBooking] } },
        ]
    },
    {
        path: '/mine/package', name: "MinePackagePage", component: MinePackagePage,
        children: [
            { path: 'admin', name: "MinePackageSummaryPage", component: MinePackageSummaryPage, meta: { roles: [claims.canViewMinePackage] } },
            { path: 'admin/edit/:recordId', name: "MinePackageEditPage", component: MinePackageEditPage, props: true, meta: { roles: [claims.canEditMinePackage] } },
            { path: 'admin/add', name: "MinePackageAddPage", component: MinePackageAddPage, meta: { roles: [claims.canEditMinePackage] } },
        ]
    },
    {
        path: '/mine/boost', name: "MineBoostPage", component: MineBoostPage,
        children: [
            { path: 'admin', name: "MineBoostSummaryPage", component: MineBoostSummaryPage, meta: { roles: [claims.canViewMineBoost] } },
            { path: 'admin/edit/:recordId', name: "MineBoostEditPage", component: MineBoostEditPage, props: true, meta: { roles: [claims.canEditMineBoost] } },
            { path: 'admin/add', name: "MineBoostAddPage", component: MineBoostAddPage, meta: { roles: [claims.canEditMineBoost] } },
        ]
    },
    {
        path: '/mine/packageschedule', name: "MinePackageSchedulePage", component: MinePackageSchedulePage,
        children: [
            { path: 'admin', name: "MinePackageScheduleSummaryPage", component: MinePackageScheduleSummaryPage, meta: { roles: [claims.canViewMinePackageSchedule] } },
            { path: 'admin/edit/:recordId', name: "MinePackageScheduleEditPage", component: MinePackageScheduleEditPage, props: true, meta: { roles: [claims.canEditMinePackageSchedule] } },
            { path: 'admin/add', name: "MinePackageScheduleAddPage", component: MinePackageScheduleAddPage, meta: { roles: [claims.canEditMinePackageSchedule] } },
        ]
    },
    {
        path: '/investment', name: "InvestmentPage", component: InvestmentPage,
        children: [
            { path: 'booking/cancellation', name: "InvestmentBookingUserSummaryPage", component: InvestmentBookingSummaryPage, meta: { roles: [claims.canViewInvestmentBooking] } },
            { path: 'booking/user', name: "InvestmentBookingCancellationSummaryPage", component: InvestmentBookingSummaryPage, meta: { roles: [claims.canViewInvestmentBooking] } },
            { path: 'booking/history', name: "InvestmentBookingHistorySummaryPage", component: InvestmentBookingSummaryPage, meta: { roles: [claims.canViewInvestmentBooking] } },
            { path: 'fund', name: "InvestmentFundSummaryPage", component: InvestmentFundSummaryPage, meta: { roles: [claims.canViewInvestmentProject] } },
            { path: 'fund/:recordId', name: "InvestmentFundDetailPage", component: InvestmentFundDetailPage, props: true, meta: { roles: [claims.canEditInvestmentProject] } },
            { path: 'fund/edit/:recordId', name: "InvestmentFundEditPage", component: InvestmentFundEditPage, props: true, meta: { roles: [claims.canEditInvestmentProject] } },
            { path: 'add', name: "InvestmentFundAddPage", component: InvestmentFundAddPage, meta: { roles: [claims.canEditInvestmentProject] } },
        ]
    },
    {
        path: '/statistics', name: "StatisticPage", component: StatisticPage,
        children: [
            { path: 'general', name: "StatisticGeneralSummaryPage", component: StatisticGeneralSummaryPage, meta: { roles: [claims.canViewStatistic] } },
            { path: 'review', name: "StatisticReviewSummaryPage", component:StatisticReviewSummaryPage, meta: { roles: [claims.canViewStatistic] }  },
            { path: 'mine', name: "StatisticMineSummaryPage", component: StatisticMineSummaryPage, meta: { roles: [claims.canViewStatistic] } },
            { path: 'game-invest', name: "StatisticGameInvestSummaryPage", component: StatisticGameInvestSummaryPage, meta: { roles: [claims.canViewStatistic] } },

            { path: 'burce-force-ip', name: "StatisticBurceForceIPSummaryPage", component: StatisticBurceForceIPSummaryPage, meta: { roles: [claims.canViewStatistic] } },
        ]
    },
    {
        path: '/report', name: "ReportPage", component: () => import('views/Report/ReportPage.vue'),
        children: [
            { path: '', name: "ReportSummaryPage", component: () => import('views/Report/SummaryPage.vue'), meta: { roles: [claims.canViewTeamReport] } },
            { path: 'myteam/:selfUtId/:utId', name: "MyTeamSummaryPage", component: MyTeamSummaryPage, props: true, meta: { roles: [claims.canViewTeamReport] } },
        ]
    },
    {
        path: '/:catchAll(.*)*',
        name: "NotFound",
        component: () => import('views/NotFound/NotFoundPage.vue'),
        meta: {
            roles: all,
        },
    },
    {
        path: '/red-packet', name: "RedPacketPage", component: () => import('views/RedPacket/RedPacketPage.vue'),
        children: [
            {
                path: '', name: "RedPacketSummaryPage", component: () => import('views/RedPacket/SummaryPage.vue'),
                meta: {
                    roles: [claims.canViewRedPacket]
                },
            },
            {
                path: 'edit/:recordId', name: "RedPacketEditPage", component: () => import('views/RedPacket/EditPage.vue'),
                props: true, meta: { roles: [claims.canEditRedPacket] }
            },
            {
                path: 'add', name: "RedPacketAddPage", component: () => import('views/RedPacket/AddPage.vue'),
                meta: { roles: [claims.canEditRedPacket] }
            },
            {
                path: 'duplicate/:recordId', name: "RedPacketDuplicatePage", component: () => import('views/RedPacket/DuplicatePage.vue'),
                props: true, meta: { roles: [claims.canEditRedPacket] }
            },
        ]
    },
];

function authorizationMiddleware(config) {
    return async (to, from, next) => {
        const notFoundPage = { name: 'NotFound' };

        if (to.meta.roles === all) {
            return next()
        }

        if (to.meta.roles) {
            const requiredRoles = to.meta.roles;
            const matchedPermissions = config.permissions.filter(permission => requiredRoles.includes(permission));
            if (matchedPermissions.length > 0)
                return next();
        }

        return next(notFoundPage)
    }
}

export function createRouterFunction(config) {
    const router = createRouter({
        history: createWebHistory(),
        routes: routes
    });

    if (config.permissions)
        router.beforeEach(authorizationMiddleware({ router, ...config }));

    return router;
}