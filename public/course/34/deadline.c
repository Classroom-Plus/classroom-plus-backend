#include <stdio.h>
#include <stdlib.h>

int main()
{
    long long times,num,i,m,n,tempt,check,j,sumwaste;
    long long wastetime[105]= {0};
    long long deadline[105]= {0};
    scanf("%lld",&times);
    while(times--)
    {
        check=0;
        sumwaste=0;
        for(i=0; i<105; i++)
        {
            wastetime[i]=0;
            deadline[i]=0;
        }
        scanf("%lld",&num);
        for(i=0; i<num; i++)
        {
            scanf("%lld",&wastetime[i]);
        }
        for(i=0; i<num; i++)
        {
            scanf("%lld",&deadline[i]);
        }
        for(m=0; m<=num-2; m++)
        {
            for(n=m+1; n<num; n++)
            {
                if(wastetime[m]>wastetime[n])
                {
                    tempt=wastetime[m];
                    wastetime[m]=wastetime[n];
                    wastetime[n]=tempt;
                    tempt=deadline[m];
                    deadline[m]=deadline[n];
                    deadline[n]=tempt;
                }
            }
        }
        for(j=0; j<num; j++){
            sumwaste+=wastetime[j];
            if(deadline[j]<sumwaste){
                check=1;
                break;
            }
        }
        if(check==0){printf("Yes\n");}
        if(check==1){printf("No\n");}
    }
}
