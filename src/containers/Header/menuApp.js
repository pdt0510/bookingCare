import { routeLinks } from '../../connectSupplyFE/otherSupplies';

const {
  userManageLink,
  userReduxLink,
  userDoctorLink,
  userAdminLink,
  userClinicLink,
  userSpecialityLink,
  userHandbookLink,
} = routeLinks;

//src14, 24ms37ss
export const adminMenu = [
  //quan ly user
  {
    //30ms16ss
    name: 'menu.admin.user-manager',
    menus: [
      {
        name: 'menu.admin.crud', // 35ms43ss
        link: userManageLink,
      },
      {
        name: 'menu.admin.crud-redux', // 35ms43ss
        link: userReduxLink,

        //40ms53ss
        // name: 'menu.system.system-administrator.user-redux',
        // link: '/system/user-redux',
      },
      {
        name: 'menu.admin.doctor-manager', // 32ms33ss
        link: userDoctorLink,
      },
      {
        name: 'menu.admin.admin-manager', // 32ms33ss
        link: userAdminLink,
      },
    ],
  },

  //quan ly phong kham, 40ms23ss
  {
    name: 'menu.admin.clinic',
    menus: [
      {
        name: 'menu.admin.clinic-manager',
        link: userClinicLink,
      },
    ],
  },

  //chuyen khoa, 42ms57ss
  {
    name: 'menu.admin.speciality',
    menus: [
      {
        name: 'menu.admin.speciality-manager',
        link: userSpecialityLink,
      },
    ],
  },

  //cam nang, 42ms57ss
  {
    name: 'menu.admin.handbook',
    menus: [
      {
        name: 'menu.admin.handbook-manager',
        link: userHandbookLink,
      },
    ],
  },
];

// export const adminMenu1 = [
//   {
//     //he thong
//     name: 'menu.system.header',
//     menus: [
//       {
//         name: 'menu.system.system-administrator.header',
//         subMenus: [
//           {
//             name: 'menu.system.system-administrator.user-manage',
//             link: '/system/user-manage',
//           },
//           {
//             name: 'menu.system.system-administrator.product-manage',
//             link: '/system/product-manage',
//           },
//         ],
//       },
//     ],
//   },
// ];
