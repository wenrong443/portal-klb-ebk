import { all, claims } from 'model/claims';
export default function () {
    return {
        async getSidebarLlist() {
            return [null,
                [
                    {
                        id: "statistics",
                        link: "./exam",
                        icon: "nc-icon nc-chart-pie-36",
                        name: "labelMenuStatistics",
                        isOpen: false,
                        permissions: [claims.canViewStatistic],
                        submenus: [
                            {
                                id: "exam",
                                link: '/statistics/general',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuGeneral",
                                permissions: [claims.canViewMineProduct]
                            }, {
                                id: "exam",
                                link: '/statistics/review',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuReviewModule",
                                permissions: [claims.canViewTask]
                            }, {
                                id: "exam",
                                link: '/statistics/mine',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuMineModule",
                                permissions: [claims.canViewMineProduct]
                            }, {
                                id: "exam",
                                link: '/statistics/game-invest',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuInvestmentModule",
                                permissions: [claims.canViewInvestmentProject]
                            }, {
                                id: "exam",
                                link: '/statistics/burce-force-ip',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "fieldLabelBurceForceIP",
                                permissions: [claims.canViewStatistic]
                            },
                        ]
                    },
                    {
                        id: "user",
                        link: "./exam",
                        icon: "nc-icon nc-single-02",
                        name: "labelMenuUserAccount",
                        isOpen: false,
                        permissions: [claims.canViewUserInfo],
                        submenus: [
                            {
                                id: "exam",
                                link: '/user/normal-user/list',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuUserList",
                                permissions: [claims.canViewUserInfo]
                            },
                            {
                                id: "exam",
                                link: '/user/ranking/admin',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuRankingList",
                                permissions: [claims.canViewRanking]
                            },
                            {
                                id: "exam",
                                link: '/user/ranking/admin/mode',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuRankingModeList",
                                permissions: [claims.canViewRankingModule]
                            },
                            {
                                id: "exam",
                                link: '/user/referrer',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuChangeReferrerList",
                                permissions: [claims.canViewChangeReferrer]
                            },
                        ]
                    },
                    // {
                    //     id: "slideshow",
                    //     link: "./exam",
                    //     icon: "nc-icon nc-album-2",
                    //     name: "labelMenuSlideShow",
                    //     isOpen: false,
                    //     submenus: [
                    //         {
                    //             id: "exam",
                    //             link: '/slideshow/list',
                    //             icon: "nc-icon nc-bullet-list-67",
                    //             name: "labelMenuSlideshowList",
                    //         }
                    //     ]
                    // },
                    {
                        id: "management",
                        link: "./exam",
                        icon: "nc-icon nc-circle-10",
                        name: "labelMenuManagement",
                        isOpen: false,
                        permissions: [claims.canViewManagementAccount],
                        submenus: [
                            {
                                id: "exam",
                                link: '/management/admin',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuManagementAccountList",
                                permissions: [claims.canViewManagementAccount]
                            },
                            {
                                id: "exam",
                                link: '/management/department',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuDepartmentList",
                                permissions: [claims.canViewDepartment]
                            },
                        ]

                    },
                    {
                        id: "announcement",
                        link: "/announcement",
                        icon: "nc-icon nc-paper",
                        name: "labelMenuAnnouncement",
                        isOpen: false,
                        permissions: [claims.canViewAnnouncement],
                        submenus: [
                            {
                                id: "exam",
                                link: '/announcement',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuAnnoucementList",
                                permissions: [claims.canViewAnnouncement],
                            },
                            {
                                id: "exam",
                                link: '/announcement/category',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuCategoryList",
                                permissions: [claims.canViewCategory],
                            },
                        ]
                    },
                    {
                        id: "account",
                        link: "./exam",
                        icon: "nc-icon nc-money-coins",
                        name: "labelMenuTransaction",
                        isOpen: false,
                        permissions: [claims.canViewDeposit],
                        submenus: [
                            {
                                id: "exam",
                                link: "/account/deposit",
                                icon: "nc-icon nc-bullet-list-67",
                                name: "fieldLabelUserDepositHistory",
                                permissions: [claims.canViewDeposit],
                            },
                            {
                                id: "exam",
                                link: "/account/withdraw",
                                icon: "nc-icon nc-bullet-list-67",
                                name: "fieldLabelUserWithdrawHistory",
                                permissions: [claims.canViewWithdraw],
                            },
                            {
                                id: "exam",
                                link: "/account/manualfund",
                                icon: "nc-icon nc-bullet-list-67",
                                name: "fieldLabelUserManualFundHistory",
                                permissions: [claims.canViewManualFund],
                            },
                            {
                                id: "exam",
                                link: "/account/bank",
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuUserBankList",
                                permissions: [claims.canViewWithdrawWalletNetwork],
                            },
                            {
                                id: "exam",
                                link: "/account/bank/collectmoney",
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuCollectMoneyBankList",
                                permissions: [claims.canViewTopupWallet],
                            },
                            {
                                id: "exam",
                                link: "/account/money-logs/admin",
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuCashFlowList",
                                permissions: [claims.canViewCashFlow],
                            }
                        ]
                    },
                    // {
                    //     id: "game-ls",
                    //     link: "./exam",
                    //     icon: "nc-icon nc-spaceship",
                    //     name: "labelMenuGameTaskLs",
                    //     isOpen: false,
                    //     permissions: [claims.canViewMembership],
                    //     submenus: [
                    //         {
                    //             id: "exam",
                    //             link: '/game-ls/membership',
                    //             icon: "nc-icon nc-bullet-list-67",
                    //             name: "labelMenuMembershipList",
                    //             permissions: [claims.canViewMembership],
                    //         },

                    //     ]
                    // },
                    {
                        id: "review-task",
                        link: "./exam",
                        icon: "nc-icon nc-spaceship",
                        name: "labelMenuGameTaskReview",
                        isOpen: false,
                        permissions: [claims.canViewMembership, claims.canViewTask, claims.canViewTaskTaken],
                        submenus: [
                            {
                                id: "exam",
                                link: '/review-task/membership',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuMembershipList",
                                permissions: [claims.canViewMembership],
                            },
                            {
                                id: "exam",
                                link: '/review-task/task',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuReviewTaskList",
                                permissions: [claims.canViewTask],
                            },
                            {
                                id: "exam",
                                link: '/review-task/taken',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuReviewTaskTakenList",
                                permissions: [claims.canViewTaskTaken],
                            },

                        ]
                    },
                    {
                        id: "investment",
                        link: "./exam",
                        icon: "nc-icon nc-sound-wave",
                        name: "labelMenuGameInvestment",
                        isOpen: false,
                        permissions: [claims.canViewInvestmentBooking],
                        submenus: [
                            {
                                id: "exam",
                                link: '/investment/fund',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuInvestmentProjectList",
                                permissions: [claims.canViewInvestmentProject],
                            },
                            {
                                id: "exam",
                                link: '/investment/booking/user',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuOngoingBookingList",
                                permissions: [claims.canViewInvestmentBooking],
                            },
                            {
                                id: "exam",
                                link: '/investment/booking/history',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuEndedBookingList",
                                permissions: [claims.canViewInvestmentBooking],
                            },
                            {
                                id: "exam",
                                link: '/investment/booking/cancellation',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuCancelledBookingList",
                                permissions: [claims.canViewInvestmentBooking],
                            },
                        ]
                    },
                    {
                        id: "mine",
                        link: "./exam",
                        icon: "nc-icon nc-vector",
                        name: "labelMenuGameMine",
                        isOpen: false,
                        permissions: [claims.canViewMineProduct],
                        submenus: [
                            {
                                id: "exam",
                                link: '/mine/product/admin',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuMineProductList",
                                permissions: [claims.canViewMineProduct],
                            },
                            {
                                id: "exam",
                                link: '/mine/package/admin',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuMinePackageList",
                                permissions: [claims.canViewMinePackage],
                            },
                            {
                                id: "exam",
                                link: '/mine/boost/admin',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuMineBoostList",
                                permissions: [claims.canViewMineBoost],
                            },
                            {
                                id: "exam",
                                link: '/mine/packageschedule/admin',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuMinePackageScheduleList",
                                permissions: [claims.canViewMinePackageSchedule],
                            },
                            {
                                id: "exam",
                                link: '/mine/product/booking/active',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuOngoingBookingList",
                                permissions: [claims.canViewMineBooking],
                            },
                            {
                                id: "exam",
                                link: '/mine/product/booking/history',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuEndedBookingList",
                                permissions: [claims.canViewMineBooking],
                            },
                        ]
                    },
                    {
                        id: "promocode",
                        link: "./exam",
                        icon: "nc-icon nc-vector",
                        name: "labelMenuPromoCode",
                        isOpen: false,
                        permissions: [claims.canViewPromoCode, claims.canViewPromoCodeUsage],
                        submenus: [
                            {
                                id: "exam",
                                link: '/promocode/list',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuPromoCodeList",
                                permissions: [claims.canViewPromoCode],
                            },
                            {
                                id: "exam",
                                link: '/promocode/usage',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuPromoCodeUsageList",
                                permissions: [claims.canViewPromoCodeUsage],
                            },
                        ]
                    },
                    {
                        id: "exam",
                        link: "./exam",
                        icon: "nc-icon nc-trophy",
                        name: "labelMenuGameGrabAndWin",
                        isOpen: false,
                        permissions: [claims.canViewGrabWinManagement],
                        submenus: []
                    },
                    {
                        id: "operation-logs",
                        link: "./exam",
                        icon: "nc-icon nc-tap-01",
                        name: "labelMenuOperationLogs",
                        isOpen: false,
                        permissions: [claims.canViewOperationLog],
                        submenus: [
                            {
                                id: "exam",
                                link: '/operation-logs/list',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuOperationLogs",
                                permissions: [claims.canViewOperationLog],
                            },
                        ]
                    },
                    {
                        id: "exchange-logs",
                        link: "./exam",
                        icon: "nc-icon nc-tap-01",
                        name: "labelMenuExchangeLogs",
                        isOpen: false,
                        permissions: [claims.canViewExchangeLog],
                        submenus: [
                            {
                                id: "exam",
                                link: '/exchange-logs/list',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuExchangeLogs",
                                permissions: [claims.canViewExchangeLog],
                            },
                        ]
                    },
                    {
                        id: "report",
                        link: "./exam",
                        icon: "nc-icon nc-tap-01",
                        name: "labelMenuReport",
                        isOpen: false,
                        permissions: [claims.canViewTeamReport],
                        submenus: [
                            {
                                id: "exam",
                                link: '/report',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuReportUser",
                                permissions: [claims.canViewTeamReport],
                            },
                        ]
                    },
                    {
                        id: "setting",
                        link: "./exam",
                        icon: "nc-icon nc-settings",
                        name: "labelMenuSettings",
                        isOpen: false,
                        permissions: [claims.canViewGeneralSetting, claims.canViewDailyMission],
                        submenus: [
                            {
                                id: "exam",
                                link: '/setting/general',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuGeneral",
                                permissions: [claims.canViewGeneralSetting],
                            },
                            {
                                id: "exam",
                                link: '/setting/mission',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuMissionList",
                                permissions: [claims.canViewDailyMission],
                            },
                            {
                                id: "exam",
                                link: '/setting/slideshow/list',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuSlideshowList",
                                permissions: [claims.canViewSlideshow],
                            },
                            {
                                id: "exam",
                                link: '/setting/page-background/list',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuPageBackgroundList",
                                permissions: [claims.canViewSlideshow],
                            },
                            {
                                id: "exam",
                                link: '/setting/fnq',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuFnqList",
                                permissions: [claims.canViewFaq],
                            },
                            {
                                id: "exam",
                                link: '/setting/language',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuLanguageList",
                                permissions: [claims.canViewLanguage],
                            },
                            {
                                id: "exam",
                                link: '/setting/whitelist-ip',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuWhitelistedIPList",
                                permissions: [claims.canViewWhitelistedIp],
                            },
                            {
                                id: "exam",
                                link: '/setting/static-page',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuOthers",
                                permissions: [claims.canViewOtherSetting],
                            },
                        ]
                    },
                    {
                        id: "redPacket",
                        link: "./exam",
                        icon: "nc-icon nc-tap-01",
                        name: "labelMenuRedPacketMain",
                        isOpen: false,
                        permissions: [claims.canViewRedPacket],
                        submenus: [
                            {
                                id: "exam",
                                link: '/red-packet',
                                icon: "nc-icon nc-bullet-list-67",
                                name: "labelMenuRedPacketTitle",
                                permissions: [claims.canViewRedPacket],
                            },
                        ]
                    },
                ]
            ]
        },
        getCountryList() {
            return [null, [
                { id: 60, value: "Malaysia (+60)" },
                { id: 62, value: "Indonesia (+62)" },
                { id: 65, value: "Singapore (+65)" },
                { id: 66, value: "Thailand (+66)" },
                { id: 84, value: "Vietnam (+84)" },
                { id: 86, value: "China (+86)" },
                { id: 95, value: "Myanmar (+95)" },
                { id: 852, value: "Hong Kong (+852)" },
                { id: 855, value: "Cambodia (+855)" },
                { id: 856, value: "Laos (+856)" },
                { id: 886, value: "Taiwan (+886)" },
                { id: 971, value: "United Arab Emirates (+971)" },
            ]]
        }
    }
}