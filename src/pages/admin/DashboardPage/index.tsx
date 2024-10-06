import { List, ListItemButton, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import { adminAPIs } from '../../../apis/admin.api';
import { AccountProps } from '../../../types/account.type';

function DashboardPage() {
  const [accountList, setAccountList] = useState<AccountProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await adminAPIs.accessDashboard();

      setAccountList(res.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <List>
        {accountList.map((account, i) => (
          <ListItemButton key={i}>
            <ListItemText primary="User" secondary={account?.email} />
          </ListItemButton>
        ))}
      </List>
    </>
  );
}

export default DashboardPage;
