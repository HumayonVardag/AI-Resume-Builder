import React, { useEffect, useState, useCallback } from "react";
import AddResume from "./components/AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "./../../service/GlobalApi";
import ResumeCardItem from "./components/ResumeCardItem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CreditCard } from "lucide-react";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const navigate = useNavigate();

  const getResumesList = useCallback(() => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(
      (resp) => {
        console.log("resp.data.data", resp.data.data);
        setResumeList(resp.data?.data?.map((item) => item?.attributes));
      }
    );
  }, [user?.primaryEmailAddress?.emailAddress]);

  useEffect(() => {
    user && getResumesList();
  }, [user, getResumesList]);

  /**
   * Used to Get Users Resume List
   */
  
  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating AI resume to your next Job role</p>
      <div
        className='grid grid-cols-2 
      md:grid-cols-3 lg:grid-cols-5 gap-5
      mt-10
      '>
        <AddResume />
        {resumeList?.length > 0
          ? resumeList.map((resume, index) => (
              <ResumeCardItem
                resume={resume}
                key={index}
                refreshData={getResumesList}
              />
            ))
          : 
              <div className='h-[280px] rounded-lg bg-slate-200 animate-pulse'>No Item found. Lets start adding New !!!</div>
            }
      </div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<CreditCard />}
        onClick={() => navigate('/plans')}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          borderRadius: '28px',
          padding: '12px 24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        Upgrade Plan
      </Button>
    </div>
  );
}

export default Dashboard;
