import { Button, Grid2, Paper, Box, Typography } from "@mui/material";
import SideDrawer from "./SideDrawer";
import { useCallback, useState } from "react";
import { AdminPlan } from "./AdminPlan";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    price: "100",
    title: "A",
    features: ["a", "b", "c"],
  },
  {
    price: "200",
    title: "B",
    features: ["a", "b", "c"],
  },
  {
    price: "1000",
    title: "BASIC",
    features: ["a", "b", "c"],
  },
];

const AdminPlans = () => {
  const [currentPlan, setCurrentPlan] = useState({
    price: 0,
    title: "No Data Available",
    features: [],
  });
  const navigation = useNavigate()

  const handlePlanView = useCallback((current) => {
    setCurrentPlan(current);
  }, []);

  const handlePlanCreate = useCallback((data) => {
    
  }, [])
  return (
    <Grid2 container size={12} gap={6} display={"flex"}>
      <SideDrawer />

      <Grid2 size={4}>
        <AdminPlan 
          name={currentPlan.title}
          price={currentPlan.price}
          features={currentPlan.features}
        />
      </Grid2>

      <Grid2 size={4} display={"flex"} flexDirection={"column"}>
        {plans.length > 0 ? (
          plans.map((current) => {
            return (
              <Button
                key={current.title}
                onClick={() => handlePlanView(current)}>
                {current.title}
              </Button>
            );
          })
        ) : (
          <Div> No Plans Available!! Please create one</Div>
        )}
        <Button
          onClick={() => (navigation('/admin/plans/create'))}>
          Add New Plan
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default AdminPlans;
